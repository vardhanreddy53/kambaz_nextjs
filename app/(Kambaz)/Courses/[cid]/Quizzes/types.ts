export interface QuizChoice {
  _id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  _id: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
  title: string;
  points: number;
  question: string;
  // For Multiple Choice
  choices?: QuizChoice[];
  // For True/False
  correctAnswer?: boolean;
  // For Fill in the Blank
  possibleAnswers?: string[];
  caseSensitive?: boolean;
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  course: string;
  quizType: "GRADED_QUIZ" | "PRACTICE_QUIZ" | "GRADED_SURVEY" | "UNGRADED_SURVEY";
  points: number;
  assignmentGroup: "QUIZZES" | "EXAMS" | "ASSIGNMENTS" | "PROJECT";
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate?: string;
  availableDate?: string;
  untilDate?: string;
  published: boolean;
  questions: QuizQuestion[];
}

export interface QuizAttemptAnswer {
  questionId: string;
  answer: string | boolean;
}

export interface QuizAttempt {
  _id: string;
  quiz: string;
  user: string;
  course: string;
  attemptNumber: number;
  score: number;
  answers: QuizAttemptAnswer[];
  submittedAt: string;
  timeSpent?: number;
}