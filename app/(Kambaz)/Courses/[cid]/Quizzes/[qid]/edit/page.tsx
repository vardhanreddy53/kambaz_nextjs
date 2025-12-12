'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Form, Nav, Tab } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import Editor from 'react-simple-wysiwyg';
import { setCurrentQuiz, updateQuiz as updateQuizAction } from "../../reducer";
import { Quiz } from "../../types";
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

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const courseId = cid as string;
  const quizId = qid as string;
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { currentQuiz } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  
  const [activeTab, setActiveTab] = useState<string>("details");
  const [formData, setFormData] = useState<Partial<Quiz>>({
    title: '',
    description: '',
    quizType: 'GRADED_QUIZ',
    assignmentGroup: 'QUIZZES',
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: 'IMMEDIATELY',
    accessCode: '',
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
  });

  const fetchQuiz = useCallback(async () => {
    try {
      const quiz = await client.findQuizById(courseId, quizId);
      dispatch(setCurrentQuiz(quiz));
      setFormData(quiz);
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

  const handleInputChange = (field: keyof Quiz, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedQuiz = { ...currentQuiz, ...formData } as Quiz;
      await client.updateQuiz(courseId, updatedQuiz);
      dispatch(updateQuizAction(updatedQuiz));
      router.push(`/Courses/${courseId}/Quizzes/${quizId}`);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handleSaveAndPublish = async () => {
    try {
      const updatedQuiz = { ...currentQuiz, ...formData, published: true } as Quiz;
      await client.updateQuiz(courseId, updatedQuiz);
      dispatch(updateQuizAction(updatedQuiz));
      router.push(`/Courses/${courseId}/Quizzes`);
    } catch (error) {
      console.error("Error saving and publishing quiz:", error);
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${courseId}/Quizzes`);
  };

  if (!currentQuiz) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="wd-quiz-editor p-4">
      <h3>Edit Quiz</h3>
      
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || "details")}>
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="details">Details</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="questions" onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quizId}/questions`)}>
              Questions
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="details">
            <Form>
              {/* Title */}
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </Form.Group>

              {/* Description with WYSIWYG */}
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Editor
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  containerProps={{ style: { minHeight: '200px', border: '1px solid #dee2e6', borderRadius: '0.375rem' } }}
                />
              </Form.Group>

              {/* Quiz Type */}
              <Form.Group className="mb-3">
                <Form.Label>Quiz Type</Form.Label>
                <Form.Select
                  value={formData.quizType}
                  onChange={(e) => handleInputChange('quizType', e.target.value)}
                >
                  <option value="GRADED_QUIZ">Graded Quiz</option>
                  <option value="PRACTICE_QUIZ">Practice Quiz</option>
                  <option value="GRADED_SURVEY">Graded Survey</option>
                  <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                </Form.Select>
              </Form.Group>

              {/* Assignment Group */}
              <Form.Group className="mb-3">
                <Form.Label>Assignment Group</Form.Label>
                <Form.Select
                  value={formData.assignmentGroup}
                  onChange={(e) => handleInputChange('assignmentGroup', e.target.value)}
                >
                  <option value="QUIZZES">Quizzes</option>
                  <option value="EXAMS">Exams</option>
                  <option value="ASSIGNMENTS">Assignments</option>
                  <option value="PROJECT">Project</option>
                </Form.Select>
              </Form.Group>

              <hr />

              {/* Shuffle Answers */}
              <Form.Group className="mb-3">
                <Form.Label>Shuffle Answers</Form.Label>
                <Form.Select
                  value={formData.shuffleAnswers ? "true" : "false"}
                  onChange={(e) => handleInputChange('shuffleAnswers', e.target.value === "true")}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Form.Select>
              </Form.Group>

              {/* Time Limit */}
              <Form.Group className="mb-3">
                <Form.Label>Time Limit (Minutes)</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.timeLimit || 20}
                  onChange={(e) => handleInputChange('timeLimit', parseInt(e.target.value))}
                />
              </Form.Group>

              {/* Multiple Attempts */}
              <Form.Group className="mb-3">
                <Form.Label>Multiple Attempts</Form.Label>
                <Form.Select
                  value={formData.multipleAttempts ? "true" : "false"}
                  onChange={(e) => handleInputChange('multipleAttempts', e.target.value === "true")}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Form.Select>
              </Form.Group>

              {/* How Many Attempts */}
              {formData.multipleAttempts && (
                <Form.Group className="mb-3">
                  <Form.Label>How Many Attempts</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.howManyAttempts || 1}
                    onChange={(e) => handleInputChange('howManyAttempts', parseInt(e.target.value))}
                    min={1}
                  />
                </Form.Group>
              )}

              {/* Show Correct Answers */}
              <Form.Group className="mb-3">
                <Form.Label>Show Correct Answers</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.showCorrectAnswers || 'IMMEDIATELY'}
                  onChange={(e) => handleInputChange('showCorrectAnswers', e.target.value)}
                  placeholder="e.g., IMMEDIATELY, AFTER_DUE_DATE"
                />
              </Form.Group>

              {/* Access Code */}
              <Form.Group className="mb-3">
                <Form.Label>Access Code</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.accessCode || ''}
                  onChange={(e) => handleInputChange('accessCode', e.target.value)}
                  placeholder="Leave blank for no access code"
                />
              </Form.Group>

              {/* One Question at a Time */}
              <Form.Group className="mb-3">
                <Form.Label>One Question at a Time</Form.Label>
                <Form.Select
                  value={formData.oneQuestionAtATime ? "true" : "false"}
                  onChange={(e) => handleInputChange('oneQuestionAtATime', e.target.value === "true")}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Form.Select>
              </Form.Group>

              {/* Webcam Required */}
              <Form.Group className="mb-3">
                <Form.Label>Webcam Required</Form.Label>
                <Form.Select
                  value={formData.webcamRequired ? "true" : "false"}
                  onChange={(e) => handleInputChange('webcamRequired', e.target.value === "true")}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Form.Select>
              </Form.Group>

              {/* Lock Questions After Answering */}
              <Form.Group className="mb-3">
                <Form.Label>Lock Questions After Answering</Form.Label>
                <Form.Select
                  value={formData.lockQuestionsAfterAnswering ? "true" : "false"}
                  onChange={(e) => handleInputChange('lockQuestionsAfterAnswering', e.target.value === "true")}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </Form.Select>
              </Form.Group>

              <hr />

              {/* Due Date */}
              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={formData.dueDate ? new Date(formData.dueDate).toISOString().slice(0, 16) : ''}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                />
              </Form.Group>

              {/* Available Date */}
              <Form.Group className="mb-3">
                <Form.Label>Available Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={formData.availableDate ? new Date(formData.availableDate).toISOString().slice(0, 16) : ''}
                  onChange={(e) => handleInputChange('availableDate', e.target.value)}
                />
              </Form.Group>

              {/* Until Date */}
              <Form.Group className="mb-3">
                <Form.Label>Until Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={formData.untilDate ? new Date(formData.untilDate).toISOString().slice(0, 16) : ''}
                  onChange={(e) => handleInputChange('untilDate', e.target.value)}
                />
              </Form.Group>

              {/* Action Buttons */}
              <div className="d-flex gap-2 mt-4">
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="danger" onClick={handleSaveAndPublish}>
                  Save & Publish
                </Button>
              </div>
            </Form>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}