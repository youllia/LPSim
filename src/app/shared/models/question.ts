import { Answer } from './answer';

export type QuestionType='mc' | 'sc' | 'fi';

export interface Question {
    id: number;
    catalogId: number;
    type: QuestionType;
    questionText: string;
    answer: Answer[];
    hint: string;
}