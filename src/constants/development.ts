import { v4 as uuidv4 } from 'uuid';

import { QuizWithNoSelectedAnswers } from '@/types/quiz-types';

export const QUIZZES: QuizWithNoSelectedAnswers = {
  id: uuidv4(),
  quizzes: [
    {
      id: uuidv4(),
      question: 'What is the best programming language?',
      choices: [
        { id: uuidv4(), choice: 'Java', isCorrect: false },
        { id: uuidv4(), choice: 'TypeScript', isCorrect: true },
        { id: uuidv4(), choice: 'Python', isCorrect: true },
        { id: uuidv4(), choice: 'C#', isCorrect: false },
      ],
    },
    {
      id: uuidv4(),
      question: 'Which language is primarily used for iOS development?',
      choices: [
        { id: uuidv4(), choice: 'Java', isCorrect: false },
        { id: uuidv4(), choice: 'Swift', isCorrect: true },
        { id: uuidv4(), choice: 'Kotlin', isCorrect: false },
        { id: uuidv4(), choice: 'JavaScript', isCorrect: false },
      ],
    },
    {
      id: uuidv4(),
      question: 'Which database system is based on SQL and primarily used for relational databases?',
      choices: [
        { id: uuidv4(), choice: 'MongoDB', isCorrect: false },
        { id: uuidv4(), choice: 'MySQL', isCorrect: true },
        { id: uuidv4(), choice: 'Redis', isCorrect: false },
        { id: uuidv4(), choice: 'Cassandra', isCorrect: false },
      ],
    },
    {
      id: uuidv4(),
      question: 'Which of the following is not a front-end framework?',
      choices: [
        { id: uuidv4(), choice: 'React', isCorrect: false },
        { id: uuidv4(), choice: 'Vue.js', isCorrect: false },
        { id: uuidv4(), choice: 'Angular', isCorrect: false },
        { id: uuidv4(), choice: 'Express.js', isCorrect: true },
      ],
    },
    {
      id: uuidv4(),
      question: 'Which tool is commonly used for version control in software development?',
      choices: [
        { id: uuidv4(), choice: 'Git', isCorrect: true },
        { id: uuidv4(), choice: 'JIRA', isCorrect: false },
        { id: uuidv4(), choice: 'Trello', isCorrect: false },
        { id: uuidv4(), choice: 'Slack', isCorrect: false },
      ],
    },
    {
      id: uuidv4(),
      question: 'Which protocol is commonly used for secure web traffic?',
      choices: [
        { id: uuidv4(), choice: 'HTTP', isCorrect: false },
        { id: uuidv4(), choice: 'HTTPS', isCorrect: true },
        { id: uuidv4(), choice: 'FTP', isCorrect: false },
        { id: uuidv4(), choice: 'SMTP', isCorrect: false },
      ],
    },
    {
      id: uuidv4(),
      question: 'Which language is used for styling web content?',
      choices: [
        { id: uuidv4(), choice: 'HTML', isCorrect: false },
        { id: uuidv4(), choice: 'CSS', isCorrect: true },
        { id: uuidv4(), choice: 'JavaScript', isCorrect: false },
        { id: uuidv4(), choice: 'PHP', isCorrect: false },
      ],
    },
    {
      id: uuidv4(),
      question:
        'Which of the following is a popular JavaScript runtime built on Chrome’s V8 JavaScript engine?',
      choices: [
        { id: uuidv4(), choice: 'Django', isCorrect: false },
        { id: uuidv4(), choice: 'Node.js', isCorrect: true },
        { id: uuidv4(), choice: 'Ruby on Rails', isCorrect: false },
        { id: uuidv4(), choice: 'Flask', isCorrect: false },
      ],
    },
    {
      id: uuidv4(),
      question: 'Which of the following is not a JavaScript framework or library?',
      choices: [
        { id: uuidv4(), choice: 'React', isCorrect: false },
        { id: uuidv4(), choice: 'Vue.js', isCorrect: false },
        { id: uuidv4(), choice: 'Angular', isCorrect: false },
        { id: uuidv4(), choice: 'Laravel', isCorrect: true },
      ],
    },
    {
      id: uuidv4(),
      question: 'Which data format is commonly used for asynchronous browser/server communication?',
      choices: [
        { id: uuidv4(), choice: 'XML', isCorrect: false },
        { id: uuidv4(), choice: 'JSON', isCorrect: true },
        { id: uuidv4(), choice: 'HTML', isCorrect: false },
        { id: uuidv4(), choice: 'CSV', isCorrect: false },
      ],
    },
  ],
};
