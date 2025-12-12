'use client'

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { QuizQuestion, QuizChoice } from "../../types";
import Editor from 'react-simple-wysiwyg';

interface QuestionEditorProps {
  question: QuizQuestion;
  onSave: (question: QuizQuestion) => void;
  onCancel: () => void;
}

export default function QuestionEditor({ question, onSave, onCancel }: QuestionEditorProps) {
  const [formData, setFormData] = useState<QuizQuestion>(question);

  const handleTypeChange = (newType: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK") => {
    let updatedQuestion = { ...formData, type: newType };

    if (newType === "MULTIPLE_CHOICE") {
      updatedQuestion.choices = formData.choices || [
        { _id: Math.random().toString(), text: "Option 1", isCorrect: true },
        { _id: Math.random().toString(), text: "Option 2", isCorrect: false },
      ];
      delete updatedQuestion.correctAnswer;
      delete updatedQuestion.possibleAnswers;
    } else if (newType === "TRUE_FALSE") {
      updatedQuestion.correctAnswer = true;
      delete updatedQuestion.choices;
      delete updatedQuestion.possibleAnswers;
    } else if (newType === "FILL_IN_BLANK") {
      updatedQuestion.possibleAnswers = [""];
      updatedQuestion.caseSensitive = false;
      delete updatedQuestion.choices;
      delete updatedQuestion.correctAnswer;
    }

    setFormData(updatedQuestion);
  };

  const handleAddChoice = () => {
    const newChoice: QuizChoice = {
      _id: Math.random().toString(),
      text: `Option ${(formData.choices?.length || 0) + 1}`,
      isCorrect: false,
    };
    setFormData({
      ...formData,
      choices: [...(formData.choices || []), newChoice],
    });
  };

  const handleRemoveChoice = (choiceId: string) => {
    setFormData({
      ...formData,
      choices: formData.choices?.filter(c => c._id !== choiceId),
    });
  };

  const handleChoiceTextChange = (choiceId: string, text: string) => {
    setFormData({
      ...formData,
      choices: formData.choices?.map(c =>
        c._id === choiceId ? { ...c, text } : c
      ),
    });
  };

  const handleCorrectChoiceChange = (choiceId: string) => {
    setFormData({
      ...formData,
      choices: formData.choices?.map(c =>
        c._id === choiceId ? { ...c, isCorrect: true } : { ...c, isCorrect: false }
      ),
    });
  };

  const handleAddPossibleAnswer = () => {
    setFormData({
      ...formData,
      possibleAnswers: [...(formData.possibleAnswers || []), ""],
    });
  };

  const handleRemovePossibleAnswer = (index: number) => {
    setFormData({
      ...formData,
      possibleAnswers: formData.possibleAnswers?.filter((_, i) => i !== index),
    });
  };

  const handlePossibleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...(formData.possibleAnswers || [])];
    newAnswers[index] = value;
    setFormData({
      ...formData,
      possibleAnswers: newAnswers,
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="question-editor">
      <Form>
        {/* Question Type */}
        <Form.Group className="mb-3">
          <Form.Label>Question Type</Form.Label>
          <Form.Select
            value={formData.type}
            onChange={(e) => handleTypeChange(e.target.value as any)}
          >
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="TRUE_FALSE">True/False</option>
            <option value="FILL_IN_BLANK">Fill in the Blank</option>
          </Form.Select>
        </Form.Group>

        {/* Title */}
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </Form.Group>

        {/* Points */}
        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={formData.points}
            onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
            min={0}
          />
        </Form.Group>

        {/* Question Text */}
        <Form.Group className="mb-3">
          <Form.Label>Question</Form.Label>
          <Editor
    value={formData.question || ''}
    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
    containerProps={{ 
      style: { 
        minHeight: '200px', 
        border: '1px solid #dee2e6', 
        borderRadius: '0.375rem' 
      } 
    }}
  />
        </Form.Group>

        {/* Multiple Choice Options */}
        {formData.type === "MULTIPLE_CHOICE" && (
          <div className="mb-3">
            <Form.Label>Choices</Form.Label>
            {formData.choices?.map((choice) => (
              <div key={choice._id} className="d-flex align-items-center mb-2">
                <Form.Check
                  type="radio"
                  name="correctAnswer"
                  checked={choice.isCorrect}
                  onChange={() => handleCorrectChoiceChange(choice._id)}
                  className="me-2"
                />
                <Form.Control
                  type="text"
                  value={choice.text}
                  onChange={(e) => handleChoiceTextChange(choice._id, e.target.value)}
                  className="me-2"
                />
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleRemoveChoice(choice._id)}
                  disabled={(formData.choices?.length || 0) <= 2}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="outline-primary" size="sm" onClick={handleAddChoice}>
              + Add Choice
            </Button>
          </div>
        )}

        {/* True/False Options */}
        {formData.type === "TRUE_FALSE" && (
          <Form.Group className="mb-3">
            <Form.Label>Correct Answer</Form.Label>
            <div>
              <Form.Check
                type="radio"
                label="True"
                name="trueFalse"
                checked={formData.correctAnswer === true}
                onChange={() => setFormData({ ...formData, correctAnswer: true })}
              />
              <Form.Check
                type="radio"
                label="False"
                name="trueFalse"
                checked={formData.correctAnswer === false}
                onChange={() => setFormData({ ...formData, correctAnswer: false })}
              />
            </div>
          </Form.Group>
        )}

        {/* Fill in the Blank Options */}
        {formData.type === "FILL_IN_BLANK" && (
          <div className="mb-3">
            <Form.Label>Possible Correct Answers</Form.Label>
            {formData.possibleAnswers?.map((answer, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <Form.Control
                  type="text"
                  value={answer}
                  onChange={(e) => handlePossibleAnswerChange(index, e.target.value)}
                  placeholder="Enter a possible answer"
                  className="me-2"
                />
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleRemovePossibleAnswer(index)}
                  disabled={(formData.possibleAnswers?.length || 0) <= 1}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="outline-primary" size="sm" onClick={handleAddPossibleAnswer}>
              + Add Answer
            </Button>

            <Form.Group className="mt-3">
              <Form.Check
                type="checkbox"
                label="Case Sensitive"
                checked={formData.caseSensitive || false}
                onChange={(e) => setFormData({ ...formData, caseSensitive: e.target.checked })}
              />
            </Form.Group>
          </div>
        )}

        {/* Action Buttons */}
        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Update Question
          </Button>
        </div>
      </Form>
    </div>
  );
}