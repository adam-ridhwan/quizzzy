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
  {
    _id: '4',
    question: 'Which of the following is not a front-end framework?',
    correctAnswers: ['Express.js'],
    choices: ['React', 'Vue.js', 'Angular', 'Express.js'],
  },
  {
    _id: '5',
    question: 'Which tool is commonly used for version control in software development?',
    correctAnswers: ['Git'],
    choices: ['Git', 'JIRA', 'Trello', 'Slack'],
  },
  {
    _id: '6',
    question: 'Which protocol is commonly used for secure web traffic?',
    correctAnswers: ['HTTPS'],
    choices: ['HTTP', 'HTTPS', 'FTP', 'SMTP'],
  },
  {
    _id: '7',
    question: 'Which language is used for styling web content?',
    correctAnswers: ['CSS'],
    choices: ['HTML', 'CSS', 'JavaScript', 'PHP'],
  },
  {
    _id: '8',
    question:
      'Which of the following is a popular JavaScript runtime built on Chrome’s V8 JavaScript engine?',
    correctAnswers: ['Node.js'],
    choices: ['Django', 'Node.js', 'Ruby on Rails', 'Flask'],
  },
  {
    _id: '9',
    question: 'Which of the following is not a JavaScript framework or library?',
    correctAnswers: ['Laravel'],
    choices: ['React', 'Vue.js', 'Angular', 'Laravel'],
  },
  {
    _id: '10',
    question: 'Which data format is commonly used for asynchronous browser/server communication?',
    correctAnswers: ['JSON'],
    choices: ['XML', 'JSON', 'HTML', 'CSV'],
  },
];
