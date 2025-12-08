import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz, QuizQuestion } from "./types";

interface QuizzesState {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
}

const initialState: QuizzesState = {
  quizzes: [],
  currentQuiz: null,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },

    setCurrentQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.currentQuiz = action.payload;
    },

    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes.push(action.payload);
    },

    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === action.payload._id ? action.payload : q
      );
      if (state.currentQuiz && state.currentQuiz._id === action.payload._id) {
        state.currentQuiz = action.payload;
      }
    },

    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== action.payload);
      if (state.currentQuiz && state.currentQuiz._id === action.payload) {
        state.currentQuiz = null;
      }
    },

    addQuestion: (state, action: PayloadAction<{ quizId: string; question: QuizQuestion }>) => {
      const { quizId, question } = action.payload;
      const quiz = state.quizzes.find((q) => q._id === quizId);
      if (quiz) {
        quiz.questions.push(question);
        quiz.points = quiz.questions.reduce((sum, q) => sum + (q.points || 0), 0);
      }
      if (state.currentQuiz && state.currentQuiz._id === quizId) {
        state.currentQuiz.questions.push(question);
        state.currentQuiz.points = state.currentQuiz.questions.reduce(
          (sum, q) => sum + (q.points || 0),
          0
        );
      }
    },

    updateQuestion: (
      state,
      action: PayloadAction<{ quizId: string; question: QuizQuestion }>
    ) => {
      const { quizId, question } = action.payload;
      const quiz = state.quizzes.find((q) => q._id === quizId);
      if (quiz) {
        quiz.questions = quiz.questions.map((q) =>
          q._id === question._id ? question : q
        );
        quiz.points = quiz.questions.reduce((sum, q) => sum + (q.points || 0), 0);
      }
      if (state.currentQuiz && state.currentQuiz._id === quizId) {
        state.currentQuiz.questions = state.currentQuiz.questions.map((q) =>
          q._id === question._id ? question : q
        );
        state.currentQuiz.points = state.currentQuiz.questions.reduce(
          (sum, q) => sum + (q.points || 0),
          0
        );
      }
    },

    deleteQuestion: (
      state,
      action: PayloadAction<{ quizId: string; questionId: string }>
    ) => {
      const { quizId, questionId } = action.payload;
      const quiz = state.quizzes.find((q) => q._id === quizId);
      if (quiz) {
        quiz.questions = quiz.questions.filter((q) => q._id !== questionId);
        quiz.points = quiz.questions.reduce((sum, q) => sum + (q.points || 0), 0);
      }
      if (state.currentQuiz && state.currentQuiz._id === quizId) {
        state.currentQuiz.questions = state.currentQuiz.questions.filter(
          (q) => q._id !== questionId
        );
        state.currentQuiz.points = state.currentQuiz.questions.reduce(
          (sum, q) => sum + (q.points || 0),
          0
        );
      }
    },
  },
});

export const {
  setQuizzes,
  setCurrentQuiz,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;