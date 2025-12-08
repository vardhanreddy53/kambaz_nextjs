'use client'

import React, { useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentQuiz } from "../reducer";
import { Quiz } from "../types";
import * as client from "../../../client";

interface User {
  _id: string;
  role: string;
}

interface RootState {
  quizzesReducer: {
    currentQuiz: Quiz | null;
  };
  accountReducer: {
    currentUser: User | null;
  };
}

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const courseId = cid as string;
  const quizId = qid as string;
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { currentQuiz } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  // ✅ Inline permission check
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const fetchQuiz = useCallback(async () => {
    try {
      const quiz = await client.findQuizById(courseId, quizId);
      dispatch(setCurrentQuiz(quiz));
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  }, [courseId, quizId, dispatch]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  if (!currentQuiz) {
    return <div className="p-4">Loading...</div>;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="wd-quiz-details p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>{currentQuiz.title}</h3>
        <div>
          {isFaculty && (
            <>
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quizId}/preview`)}
              >
                Preview
              </Button>
              <Button
                variant="primary"
                onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quizId}/edit`)}
              >
                Edit
              </Button>
            </>
          )}
          {!isFaculty && (
            <Button
              variant="danger"
              onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quizId}/take`)}
            >
              Take Quiz
            </Button>
          )}
        </div>
      </div>

      <div className="border rounded p-4 bg-light">
        <div className="row mb-3">
          <div className="col-md-3 fw-bold">Quiz Type</div>
          <div className="col-md-9">
            {currentQuiz.quizType.replace(/_/g, ' ')}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3 fw-bold">Points</div>
          <div className="col-md-9">{currentQuiz.points}</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3 fw-bold">Assignment Group</div>
          <div className="col-md-9">{currentQuiz.assignmentGroup}</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3 fw-bold">Shuffle Answers</div>
          <div className="col-md-9">{currentQuiz.shuffleAnswers ? "Yes" : "No"}</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3 fw-bold">Time Limit</div>
          <div className="col-md-9">{currentQuiz.timeLimit} Minutes</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3 fw-bold">Multiple Attempts</div>
          <div className="col-md-9">{currentQuiz.multipleAttempts ? "Yes" : "No"}</div>
        </div>

        {currentQuiz.multipleAttempts && (
          <div className="row mb-3">
            <div className="col-md-3 fw-bold">How Many Attempts</div>
            <div className="col-md-9">{currentQuiz.howManyAttempts}</div>
          </div>
        )}

        <div className="row mb-3">
          <div className="col-md-3 fw-bold">Show Correct Answers</div>
          <div className="col-md-9">{currentQuiz.showCorrectAnswers}</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3 fw-bold">Access Code</div>
          <div className="col-md-9">{currentQuiz.accessCode || "None"}</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3 fw-bold">One Question at a Time</div>
          <div className="col-md-9">{currentQuiz.oneQuestionAtATime ? "Yes" : "No"}</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3 fw-bold">Webcam Required</div>
          <div className="col-md-9">{currentQuiz.webcamRequired ? "Yes" : "No"}</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3 fw-bold">Lock Questions After Answering</div>
          <div className="col-md-9">{currentQuiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</div>
        </div>

        <hr />

        <div className="row mb-3">
          <div className="col-md-3 fw-bold">Due Date</div>
          <div className="col-md-9">{formatDate(currentQuiz.dueDate)}</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3 fw-bold">Available Date</div>
          <div className="col-md-9">{formatDate(currentQuiz.availableDate)}</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3 fw-bold">Until Date</div>
          <div className="col-md-9">{formatDate(currentQuiz.untilDate)}</div>
        </div>

        <hr />

        <div className="row mb-3">
          <div className="col-md-3 fw-bold">Number of Questions</div>
          <div className="col-md-9">{currentQuiz.questions?.length || 0}</div>
        </div>
      </div>

      <div className="mt-4">
        <Button
          variant="secondary"
          onClick={() => router.push(`/Courses/${courseId}/Quizzes`)}
        >
          Back to Quizzes
        </Button>
      </div>
    </div>
  );
}