'use client';

import { useState } from 'react';
import Link from 'next/link';
import * as z from 'zod';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import H2 from '@/components/ui/typography/h2';

const QuestionSchema = z.object({
  question: z
    .string()
    .min(1, 'There should be exactly 1 correct answer')
    .max(4, 'There should be exactly 4 correct answers'),
  correctAnswer: z.array(z.string()),
  choices: z
    .array(z.string())
    .min(4, 'There should be exactly 4 choices')
    .max(4, 'There should be exactly 4 choices'),
});
const QuestionsSchema = z.array(QuestionSchema);

const questions: z.infer<typeof QuestionsSchema> = [
  {
    question: 'What is the best programming language?',
    correctAnswer: ['TypeScript', 'Python'],
    choices: ['Java', 'TypeScript', 'Python', 'C#'],
  },
  {
    question: 'Which language is primarily used for iOS development?',
    correctAnswer: ['Swift'],
    choices: ['Java', 'Swift', 'Kotlin', 'JavaScript'],
  },
  {
    question: 'Which database system is based on SQL and primarily used for relational databases?',
    correctAnswer: ['MySQL'],
    choices: ['MongoDB', 'MySQL', 'Redis', 'Cassandra'],
  },
];

const Question = () => {
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = () => {
    // single response
    if (currentQuestion.correctAnswer.length === 1) {
      selectedAnswers[0] === currentQuestion.correctAnswer[0] && setScore(score + 1);
    }

    // multiple response
    else if (selectedAnswers.length >= 1 && currentQuestion.correctAnswer.length > 1) {
      if (selectedAnswers.length !== currentQuestion.correctAnswer.length) console.log('wrong');

      if (currentQuestion.correctAnswer.every((value, index) => value === selectedAnswers[index]))
        console.log('correct');
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswers([]);
  };

  const handleSelect = (choice: string) => {
    // If it's a single choice question, set the selected answer to only the current choice.
    if (currentQuestion.correctAnswer.length === 1) {
      setSelectedAnswers([choice]);
      return;
    }

    // Otherwise, toggle the answer in the selectedAnswers array.
    if (selectedAnswers.includes(choice)) setSelectedAnswers(prev => prev.filter(item => item !== choice));
    else setSelectedAnswers(prev => [...prev, choice]);

    // console.log([...selectedAnswers, choice]);
  };

  const handleReset = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
  };

  return (
    <>
      <div className='mt-10 flex flex-col gap-4'>
        {currentQuestionIndex >= questions.length ? (
          <>
            <H2>Quiz complete!</H2>
            <span>Your score is {score}</span>
            <Button onClick={handleReset}>Play again</Button>
          </>
        ) : (
          <>
            <Progress value={(currentQuestionIndex / questions.length) * 100} />

            <Badge variant='outline' className='w-max'>
              {currentQuestion.correctAnswer.length > 1 ? 'Multiple response' : 'Single response'}
            </Badge>
            <H2>{currentQuestion.question}</H2>
            <Separator className='my-2' />
            {currentQuestion.choices.map(choice => (
              <Button key={choice} variant='secondary' onClick={() => handleSelect(choice)} className='gap-2'>
                {selectedAnswers.includes(choice) ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 16 16'
                    className='h-5 w-3'
                  >
                    <path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z' />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 16 16'
                    className='h-3 w-3'
                  >
                    <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
                  </svg>
                )}
                <span className='w-full text-left'>{choice}</span>
              </Button>
            ))}
            <Button disabled={!selectedAnswers} onClick={handleSubmit} className='mt-5'>
              Submit
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default Question;
