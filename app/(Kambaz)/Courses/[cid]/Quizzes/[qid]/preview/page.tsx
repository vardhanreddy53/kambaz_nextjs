'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Form, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentQuiz } from "../../reducer";
import { Quiz, QuizQuestion } from "../../types";
import * as client from "../../../../client";

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

interface Answer {
  questionId: string;
  answer: string | boolean | string[];
}

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const courseId = cid as string;
  const quizId = qid as string;
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { currentQuiz } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<{ questionId: string; correct: boolean }[]>([]);

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

  const handleAnswerChange = (questionId: string, answer: string | boolean) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        return prev.map(a => a.questionId === questionId ? { ...a, answer } : a);
      }
      return [...prev, { questionId, answer }];
    });
  };

  const checkAnswer = (question: QuizQuestion, answer: string | boolean | string[] | undefined): boolean => {
    if (!answer) return false;

    switch (question.type) {
      case "MULTIPLE_CHOICE":
        const correctChoice = question.choices?.find(c => c.isCorrect);
        return correctChoice?._id === answer;

      case "TRUE_FALSE":
        return question.correctAnswer === answer;

      case "FILL_IN_BLANK":
        const userAnswer = answer as string;
        return question.possibleAnswers?.some(possibleAnswer => {
          if (question.caseSensitive) {
            return possibleAnswer === userAnswer;
          }
          return possibleAnswer.toLowerCase() === userAnswer.toLowerCase();
        }) || false;

      default:
        return false;
    }
  };

  const handleSubmit = () => {
    if (!currentQuiz) return;

    let totalScore = 0;
    const questionResults: { questionId: string; correct: boolean }[] = [];

    currentQuiz.questions.forEach(question => {
      const userAnswer = answers.find(a => a.questionId === question._id);
      const isCorrect = checkAnswer(question, userAnswer?.answer);
      
      if (isCorrect) {
        totalScore += question.points;
      }

      questionResults.push({
        questionId: question._id,
        correct: isCorrect,
      });
    });

    setScore(totalScore);
    setResults(questionResults);
    setSubmitted(true);
  };

  const handleEditQuiz = () => {
    router.push(`/Courses/${courseId}/Quizzes/${quizId}/questions`);
  };

  const handleRetake = () => {
    setAnswers([]);
    setSubmitted(false);
    setScore(0);
    setResults([]);
  };

  if (!currentQuiz) {
    return <div className="p-4">Loading...</div>;
  }

  const isQuestionCorrect = (questionId: string): boolean | undefined => {
    return results.find(r => r.questionId === questionId)?.correct;
  };

  return (
    <div className="wd-quiz-preview p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3>{currentQuiz.title} (Preview)</h3>
          <p className="text-muted">This is a preview - your answers will not be saved</p>
        </div>
        <div>
          <Button variant="secondary" className="me-2" onClick={handleEditQuiz}>
            Edit Quiz
          </Button>
          <Button variant="outline-secondary" onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quizId}`)}>
            Back to Details
          </Button>
        </div>
      </div>

      {submitted && (
        <Alert variant="info" className="mb-4">
          <h5>Quiz Completed!</h5>
          <p className="mb-0">Your Score: <strong>{score} / {currentQuiz.points}</strong></p>
        </Alert>
      )}

      <div className="mb-4">
        {currentQuiz.questions && currentQuiz.questions.map((question, index) => {
          const questionCorrect = isQuestionCorrect(question._id);
          const userAnswer = answers.find(a => a.questionId === question._id);

          return (
            <div
              key={question._id}
              className={`border rounded p-4 mb-3 ${
                submitted
                  ? questionCorrect
                    ? 'border-success bg-light'
                    : 'border-danger bg-light'
                  : ''
              }`}
            >
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h5>
                  Question {index + 1}
                  {submitted && (
                    <span className={questionCorrect ? 'text-success ms-2' : 'text-danger ms-2'}>
                      {questionCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  )}
                </h5>
                <span className="badge bg-secondary">{question.points} pts</span>
              </div>

              <div className="mb-3">
                <strong>{question.title}</strong>
              </div>
              <div className="mb-3" dangerouslySetInnerHTML={{ __html: question.question }} />

              {/* Multiple Choice */}
              {question.type === "MULTIPLE_CHOICE" && question.choices && (
                <div>
                  {question.choices.map(choice => (
                    <Form.Check
                      key={choice._id}
                      type="radio"
                      id={`preview-${question._id}-${choice._id}`}
                      label={choice.text}
                      name={`question-${question._id}`}
                      value={choice._id}
                      checked={userAnswer?.answer === choice._id}
                      onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                      disabled={submitted}
                      className={
                        submitted
                          ? choice.isCorrect
                            ? 'text-success fw-bold'
                            : userAnswer?.answer === choice._id
                            ? 'text-danger'
                            : ''
                          : ''
                      }
                    />
                  ))}
                </div>
              )}

              {/* True/False */}
              {question.type === "TRUE_FALSE" && (
                <div>
                  <Form.Check
                    type="radio"
                    id={`preview-${question._id}-true`}
                    label="True"
                    name={`question-${question._id}`}
                    checked={userAnswer?.answer === true}
                    onChange={() => handleAnswerChange(question._id, true)}
                    disabled={submitted}
                    className={
                      submitted
                        ? question.correctAnswer === true
                          ? 'text-success fw-bold'
                          : userAnswer?.answer === true
                          ? 'text-danger'
                          : ''
                        : ''
                    }
                  />
                  <Form.Check
                    type="radio"
                    id={`preview-${question._id}-false`}
                    label="False"
                    name={`question-${question._id}`}
                    checked={userAnswer?.answer === false}
                    onChange={() => handleAnswerChange(question._id, false)}
                    disabled={submitted}
                    className={
                      submitted
                        ? question.correctAnswer === false
                          ? 'text-success fw-bold'
                          : userAnswer?.answer === false
                          ? 'text-danger'
                          : ''
                        : ''
                    }
                  />
                </div>
              )}

              {/* Fill in the Blank */}
              {question.type === "FILL_IN_BLANK" && (
                <div>
                  <Form.Control
                    type="text"
                    value={(userAnswer?.answer as string) || ''}
                    onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                    disabled={submitted}
                    placeholder="Enter your answer"
                  />
                  {submitted && (
                    <div className="mt-2 small text-muted">
                      <strong>Possible correct answers:</strong> {question.possibleAnswers?.join(", ")}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="d-flex gap-2">
        {!submitted ? (
          <>
            <Button variant="secondary" onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quizId}`)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleSubmit}>
              Submit Preview
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quizId}`)}>
              Back to Details
            </Button>
            <Button variant="primary" onClick={handleRetake}>
              Retake Preview
            </Button>
          </>
        )}
      </div>
    </div>
  );
}