export interface Question {
  question: string;
  choices: string[];
  correctAnswer: string;
}

export interface Section {
  sectionTitle: string;
  questions: Question[];
}

export interface QuizData {
  sections: Section[];
}

export interface QuizAttempt {
  id: number;
  name: string;
  attemptDate: string;
  status: "Done" | "In Progress";
}
