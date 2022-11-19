export interface Question {
  id: string;
  text: string;
  answered: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface CreateQuestionRequest {
  text: string;
}

export interface UpdateQuestionRequest {
  text: string;
  answered: boolean;
}
