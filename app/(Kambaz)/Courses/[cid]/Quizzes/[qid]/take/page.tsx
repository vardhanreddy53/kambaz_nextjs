'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Form, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentQuiz } from "../../reducer";
import { Quiz, QuizQuestion, QuizAttempt } from "../../types";
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
  answer: string | boolean;
}

export default function QuizTaking() {
  const { cid, qid } = useParams();
  const courseId = cid as string;
  const quizId = qid as string;
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { currentQuiz } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<{ questionId: string; correct: boolean }[]>([]);
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [latestAttempt, setLatestAttempt] = useState<QuizAttempt | null>(null);
  const [startTime] = useState(new Date());

  const fetchQuiz = useCallback(async () => {
    try {
      const quiz = await client.findQuizById(courseId, quizId);
      dispatch(setCurrentQuiz(quiz));
      
      // If no access code required, grant access immediately
      if (!quiz.accessCode) {
        setAccessGranted(true);
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  }, [courseId, quizId, dispatch]);

  const fetchAttempts = useCallback(async () => {
    if (!currentUser?._id) return;
    
    try {
      const attempts = await client.getQuizAttemptsByUser(currentUser._id, quizId);
      setAttemptCount(attempts.length);
      
      if (attempts.length > 0) {
        const latest = await client.getLatestQuizAttempt(currentUser._id, quizId);
        setLatestAttempt(latest);
      }
    } catch (error) {
      console.error("Error fetching attempts:", error);
    }
  }, [currentUser, quizId]);

  useEffect(() => {
    fetchQuiz();
    fetchAttempts();
  }, [fetchQuiz, fetchAttempts]);

  const handleAnswerChange = (questionId: string, answer: string | boolean) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        return prev.map(a => a.questionId === questionId ? { ...a, answer } : a);
      }
      return [...prev, { questionId, answer }];
    });
  };

  const checkAnswer = (question: QuizQuestion, answer: string | boolean | undefined): boolean => {
    if (!answer && answer !== false) return false;

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

  const handleSubmit = async () => {
    if (!currentQuiz || !currentUser?._id) return;

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

    // Calculate time spent
    const endTime = new Date();
    const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 60000); // in minutes

    // Save attempt to database
    try {
      await client.submitQuizAttempt(courseId, quizId, currentUser._id, {
        answers,
        score: totalScore,
        timeSpent,
      });
      
      // Refresh attempts
      fetchAttempts();
    } catch (error) {
      console.error("Error saving quiz attempt:", error);
    }
  };

  const handleAccessCodeSubmit = () => {
    if (accessCodeInput === currentQuiz?.accessCode) {
      setAccessGranted(true);
    } else {
      alert("Incorrect access code. Please try again.");
    }
  };

  if (!currentQuiz) {
    return <div className="p-4">Loading...</div>;
  }

  // Check if quiz is available
  const now = new Date();
  const availableDate = currentQuiz.availableDate ? new Date(currentQuiz.availableDate) : null;
  const untilDate = currentQuiz.untilDate ? new Date(currentQuiz.untilDate) : null;

  if (!currentQuiz.published) {
    return (
      <div className="p-4">
        <Alert variant="warning">
          This quiz is not published yet. Please check back later.
        </Alert>
        <Button onClick={() => router.push(`/Courses/${courseId}/Quizzes`)}>
          Back to Quizzes
        </Button>
      </div>
    );
  }

  if (availableDate && now < availableDate) {
    return (
      <div className="p-4">
        <Alert variant="info">
          This quiz is not available yet. It will be available on {availableDate.toLocaleString()}.
        </Alert>
        <Button onClick={() => router.push(`/Courses/${courseId}/Quizzes`)}>
          Back to Quizzes
        </Button>
      </div>
    );
  }

  if (untilDate && now > untilDate) {
    return (
      <div className="p-4">
        <Alert variant="danger">
          This quiz is closed. The deadline was {untilDate.toLocaleString()}.
        </Alert>
        <Button onClick={() => router.push(`/Courses/${courseId}/Quizzes`)}>
          Back to Quizzes
        </Button>
      </div>
    );
  }

  // Check if user has exhausted attempts
  if (!currentQuiz.multipleAttempts && attemptCount >= 1) {
    return (
      <div className="p-4">
        <Alert variant="warning">
          You have already completed this quiz. Multiple attempts are not allowed.
        </Alert>
        {latestAttempt && (
          <Alert variant="info">
            <strong>Your Score:</strong> {latestAttempt.score} / {currentQuiz.points} ({Math.round((latestAttempt.score / currentQuiz.points) * 100)}%)
          </Alert>
        )}
        <Button onClick={() => router.push(`/Courses/${courseId}/Quizzes`)}>
          Back to Quizzes
        </Button>
      </div>
    );
  }

  if (currentQuiz.multipleAttempts && attemptCount >= currentQuiz.howManyAttempts) {
    return (
      <div className="p-4">
        <Alert variant="warning">
          You have exhausted all {currentQuiz.howManyAttempts} attempts for this quiz.
        </Alert>
        {latestAttempt && (
          <Alert variant="info">
            <strong>Your Best Score:</strong> {latestAttempt.score} / {currentQuiz.points} ({Math.round((latestAttempt.score / currentQuiz.points) * 100)}%)
          </Alert>
        )}
        <Button onClick={() => router.push(`/Courses/${courseId}/Quizzes`)}>
          Back to Quizzes
        </Button>
      </div>
    );
  }

  // Access Code Check
  if (currentQuiz.accessCode && !accessGranted) {
    return (
      <div className="p-4">
        <h3>{currentQuiz.title}</h3>
        <Alert variant="info">
          This quiz requires an access code to begin.
        </Alert>
        <Form.Group className="mb-3" style={{ maxWidth: '400px' }}>
          <Form.Label>Access Code</Form.Label>
          <Form.Control
            type="text"
            value={accessCodeInput}
            onChange={(e) => setAccessCodeInput(e.target.value)}
            placeholder="Enter access code"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAccessCodeSubmit}>
          Submit
        </Button>
      </div>
    );
  }

  const isQuestionCorrect = (questionId: string): boolean | undefined => {
    return results.find(r => r.questionId === questionId)?.correct;
  };

  return (
    <div className="wd-quiz-taking p-4">
      <div className="mb-4">
        <h3>{currentQuiz.title}</h3>
        {currentQuiz.description && (
          <div className="text-muted mb-3" dangerouslySetInnerHTML={{ __html: currentQuiz.description }} />
        )}
        <div className="d-flex gap-4 text-muted">
          <span><strong>Points:</strong> {currentQuiz.points}</span>
          <span><strong>Questions:</strong> {currentQuiz.questions.length}</span>
          <span><strong>Time Limit:</strong> {currentQuiz.timeLimit} minutes</span>
          {currentQuiz.dueDate && (
            <span><strong>Due:</strong> {new Date(currentQuiz.dueDate).toLocaleString()}</span>
          )}
        </div>
        
        {/* Display attempt information */}
        {currentQuiz.multipleAttempts && (
          <Alert variant="info" className="mt-3">
            <strong>Attempt {attemptCount + 1} of {currentQuiz.howManyAttempts}</strong>
            {latestAttempt && (
              <div className="mt-2">
                Previous attempt score: {latestAttempt.score} / {currentQuiz.points}
              </div>
            )}
          </Alert>
        )}
      </div>

      {submitted && (
        <Alert variant="success" className="mb-4">
          <h5>Quiz Submitted Successfully!</h5>
          <p className="mb-0">Your Score: <strong>{score} / {currentQuiz.points}</strong> ({Math.round((score / currentQuiz.points) * 100)}%)</p>
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
                      id={`take-${question._id}-${choice._id}`}
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
                    id={`take-${question._id}-true`}
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
                    id={`take-${question._id}-false`}
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
                  {submitted && currentQuiz.showCorrectAnswers && (
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
            <Button variant="secondary" onClick={() => router.push(`/Courses/${courseId}/Quizzes`)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={() => router.push(`/Courses/${courseId}/Quizzes`)}>
            Back to Quizzes
          </Button>
        )}
      </div>
    </div>
  );
}