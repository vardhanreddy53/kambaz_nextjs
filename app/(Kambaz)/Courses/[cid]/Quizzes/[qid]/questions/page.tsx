'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentQuiz, addQuestion as addQuestionAction, updateQuestion as updateQuestionAction, deleteQuestion as deleteQuestionAction } from "../../reducer";
import { Quiz, QuizQuestion } from "../../types";
import * as client from "../../../../client";
import QuestionEditor from "./QuestionEditor";

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

export default function QuizQuestionsEditor() {
  const { cid, qid } = useParams();
  const courseId = cid as string;
  const quizId = qid as string;
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { currentQuiz } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  const fetchQuiz = useCallback(async () => {
    try {
      const quiz = await client.findQuizById(courseId, quizId);
      dispatch(setCurrentQuiz(quiz));
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  }, [courseId, quizId, dispatch]);

  useEffect(() => {
    if (!isFaculty) {
      router.push(`/Courses/${courseId}/Quizzes/${quizId}`);
      return;
    }
    fetchQuiz();
  }, [fetchQuiz, isFaculty, router, courseId, quizId]);

  const handleAddQuestion = async () => {
    try {
      const newQuestion = await client.addQuestionToQuiz(courseId, quizId, {
        type: "MULTIPLE_CHOICE",
        title: "New Question",
        points: 1,
        question: "",
        choices: [
          { _id: Math.random().toString(), text: "Option 1", isCorrect: true },
          { _id: Math.random().toString(), text: "Option 2", isCorrect: false },
        ],
      });
      dispatch(addQuestionAction({ quizId, question: newQuestion }));
      setEditingQuestionId(newQuestion._id);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleSaveQuestion = async (question: QuizQuestion) => {
    try {
      const updatedQuestion = await client.updateQuestion(courseId, quizId, question);
      dispatch(updateQuestionAction({ quizId, question: updatedQuestion }));
      setEditingQuestionId(null);
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm("Are you sure you want to delete this question?")) return;
    try {
      await client.deleteQuestion(courseId, quizId, questionId);
      dispatch(deleteQuestionAction({ quizId, questionId }));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingQuestionId(null);
  };

  if (!currentQuiz) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="wd-quiz-questions-editor p-4">
      <h3>Edit Quiz: {currentQuiz.title}</h3>
      
      {/* Tab Navigation */}
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link onClick={() => router.push(`/Courses/${courseId}/Quizzes/${qid}/edit`)}>
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active>Questions</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Points Display */}
      <div className="mb-4">
        <strong>Total Points: {currentQuiz.points}</strong>
      </div>

      {/* Questions List */}
      <div className="mb-4">
        {currentQuiz.questions && currentQuiz.questions.length > 0 ? (
          currentQuiz.questions.map((question, index) => (
            <div key={question._id} className="border rounded p-3 mb-3 bg-light">
              {editingQuestionId === question._id ? (
                <QuestionEditor
                  question={question}
                  onSave={handleSaveQuestion}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <strong>Question {index + 1}</strong> - {question.points} pts
                      <div className="text-muted small">{question.type.replace(/_/g, ' ')}</div>
                    </div>
                    <div>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => setEditingQuestionId(question._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-danger"
                        onClick={() => handleDeleteQuestion(question._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="mb-2">
                    <strong>{question.title}</strong>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: question.question || '' }} />
                  
                  {/* Display choices for Multiple Choice */}
                  {question.type === "MULTIPLE_CHOICE" && question.choices && (
                    <ul className="mt-2">
                      {question.choices.map(choice => (
                        <li key={choice._id} className={choice.isCorrect ? "text-success fw-bold" : ""}>
                          {choice.text} {choice.isCorrect && "✓"}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Display answer for True/False */}
                  {question.type === "TRUE_FALSE" && (
                    <div className="mt-2">
                      <strong>Correct Answer:</strong> {question.correctAnswer ? "True" : "False"}
                    </div>
                  )}

                  {/* Display possible answers for Fill in the Blank */}
                  {question.type === "FILL_IN_BLANK" && question.possibleAnswers && (
                    <div className="mt-2">
                      <strong>Possible Answers:</strong> {question.possibleAnswers.join(", ")}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="alert alert-info">
            No questions yet. Click "New Question" to add one.
          </div>
        )}
      </div>

      {/* Add Question Button */}
      <Button variant="danger" onClick={handleAddQuestion}>
        + New Question
      </Button>

      {/* Action Buttons */}
      <div className="d-flex gap-2 mt-4">
        <Button variant="secondary" onClick={() => router.push(`/Courses/${courseId}/Quizzes`)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quizId}`)}>
          Save
        </Button>
      </div>
    </div>
  );
}