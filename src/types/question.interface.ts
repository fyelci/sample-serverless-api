export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  categoryId: number;
  text: string;
  answers: Answer[];
  explanation: string;
  isImportant: boolean;
  image?: string;
  createdAt: number;
  updatedAt: number;
}

export type CreateQuestionRequest = Omit<Question, 'id' | 'createdAt' | 'updatedAt' | 'image'>;

export type UpdateQuestionRequest = Omit<Question, 'id' | 'createdAt' | 'updatedAt'>;
