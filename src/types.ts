export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface VerbQuestion {
  id: number;
  sentenceBefore: string;
  sentenceAfter: string;
  correctVerb: string;
  options: string[];
  explanation: string;
  tense: string;
  difficulty: Difficulty;
  contextHint?: string; // Sentence context hint
}

export interface GameStats {
  score: number;
  streak: number;
  maxStreak: number;
  lives: number;
  currentQuestionIndex: number;
  correctAnswersCount: number;
  wrongAnswersCount: number;
  completed: boolean;
}
