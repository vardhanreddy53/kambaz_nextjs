'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaBan, FaCheckCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { setQuizzes, deleteQuiz as deleteQuizAction, updateQuiz as updateQuizAction } from "./reducer";
import { Quiz, QuizAttempt } from "./types";
import * as client from "../../client";

interface User {
  _id: string;
  role: string;
}

interface RootState {
  quizzesReducer: {
    quizzes: Quiz[];
  };
  accountReducer: {
    currentUser: User | null;
  };
}

export default function Quizzes() {
  const { cid } = useParams();
  const courseId = cid as string;
  const dispatch = useDispatch();
  const router = useRouter();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const [userAttempts, setUserAttempts] = useState<QuizAttempt[]>([]);

  const fetchQuizzes = useCallback(async () => {
    if (!courseId) return;
    try {
      const fetchedQuizzes = await client.findQuizzesForCourse(courseId);
      dispatch(setQuizzes(fetchedQuizzes));
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  }, [courseId, dispatch]);

  const fetchUserAttempts = useCallback(async () => {
    if (!currentUser?._id || isFaculty) return;
    
    try {
      const attempts = await client.getUserCourseAttempts(currentUser._id, courseId);
      setUserAttempts(attempts);
    } catch (error) {
      console.error("Error fetching user attempts:", error);
    }
  }, [currentUser, courseId, isFaculty]);

  const handleCreateQuiz = async () => {
    try {
      const newQuiz = await client.createQuizForCourse(courseId, {
        title: "Untitled Quiz",
        description: "",
      });
      router.push(`/Courses/${courseId}/Quizzes/${newQuiz._id}/edit`);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;
    try {
      await client.deleteQuiz(courseId, quizId);
      dispatch(deleteQuizAction(quizId));
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handleTogglePublish = async (quiz: Quiz) => {
    try {
      const updatedQuiz = { ...quiz, published: !quiz.published };
      await client.updateQuiz(courseId, updatedQuiz);
      dispatch(updateQuizAction(updatedQuiz));
    } catch (error) {
      console.error("Error toggling publish:", error);
    }
  };

  const getAvailabilityStatus = (quiz: Quiz) => {
    const now = new Date();
    const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (!quiz.published) {
      return { text: "Not Published", color: "text-muted" };
    }

    if (untilDate && now > untilDate) {
      return { text: "Closed", color: "text-danger" };
    }

    if (availableDate && now < availableDate) {
      return {
        text: `Not available until ${availableDate.toLocaleDateString()}`,
        color: "text-warning",
      };
    }

    return { text: "Available", color: "text-success" };
  };

  const getLatestScore = (quizId: string): number | null => {
    const attempt = userAttempts.find(a => a.quiz === quizId);
    return attempt ? attempt.score : null;
  };

  useEffect(() => {
    fetchQuizzes();
    fetchUserAttempts();
  }, [fetchQuizzes, fetchUserAttempts]);

  // Filter quizzes based on user role
  const displayQuizzes = isFaculty 
    ? quizzes 
    : quizzes.filter(q => q.published);

  return (
    <div className="wd-quizzes p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Quizzes</h3>
        {isFaculty && (
          <Button variant="danger" onClick={handleCreateQuiz}>
            + Quiz
          </Button>
        )}
      </div>

      {displayQuizzes.length === 0 && (
        <div className="alert alert-info text-center">
          {isFaculty 
            ? "No quizzes yet. Click '+ Quiz' to create one." 
            : "No quizzes available for this course."}
        </div>
      )}

      <div className="list-group">
        {displayQuizzes.map((quiz) => {
          const availability = getAvailabilityStatus(quiz);
          const studentScore = getLatestScore(quiz._id);
          
          return (
            <div
              key={quiz._id}
              className="list-group-item list-group-item-action mb-3"
            >
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-2">
                    {isFaculty && (
                      <span
                        className="me-3"
                        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                        onClick={() => handleTogglePublish(quiz)}
                        title={quiz.published ? "Published - Click to unpublish" : "Unpublished - Click to publish"}
                      >
                        {quiz.published ? (
                          <FaCheckCircle className="text-success" />
                        ) : (
                          <FaBan className="text-danger" />
                        )}
                      </span>
                    )}
                    <div
                      className="flex-grow-1"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        if (isFaculty) {
                          router.push(`/Courses/${courseId}/Quizzes/${quiz._id}`);
                        } else {
                          router.push(`/Courses/${courseId}/Quizzes/${quiz._id}/take`);
                        }
                      }}
                    >
                      <h5 className="mb-1">{quiz.title}</h5>
                      <div className="text-muted small">
                        <span className={availability.color}>
                          <strong>{availability.text}</strong>
                        </span>
                        {quiz.dueDate && (
                          <span className="ms-3">
                            Due: {new Date(quiz.dueDate).toLocaleDateString()}
                          </span>
                        )}
                        <span className="ms-3">{quiz.points} pts</span>
                        <span className="ms-3">
                          {quiz.questions?.length || 0} Questions
                        </span>
                        {!isFaculty && studentScore !== null && (
                          <span className="ms-3 text-success fw-bold">
                            Score: {studentScore} / {quiz.points}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {isFaculty && (
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="link"
                      className="text-dark p-0"
                      id={`dropdown-${quiz._id}`}
                    >
                      <BsThreeDotsVertical />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() =>
                          router.push(`/Courses/${courseId}/Quizzes/${quiz._id}/edit`)
                        }
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDeleteQuiz(quiz._id)}>
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleTogglePublish(quiz)}>
                        {quiz.published ? "Unpublish" : "Publish"}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          router.push(`/Courses/${courseId}/Quizzes/${quiz._id}/preview`)
                        }
                      >
                        Preview
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}