import { QuizzesWithSelectedAnswers } from '@/types/quiz-types';

export const QUIZZES: QuizzesWithSelectedAnswers[] = [
  {
    _id: '1',
    question: 'What is the best programming language?',
    correctAnswers: ['TypeScript', 'Python'],
    choices: ['Java', 'TypeScript', 'Python', 'C#'],
  },
  {
    _id: '2',
    question: 'Which language is primarily used for iOS development?',
    correctAnswers: ['Swift'],
    choices: ['Java', 'Swift', 'Kotlin', 'JavaScript'],
  },
  {
    _id: '3',
    question: 'Which database system is based on SQL and primarily used for relational databases?',
    correctAnswers: ['MySQL'],
    choices: ['MongoDB', 'MySQL', 'Redis', 'Cassandra'],
  },
];
