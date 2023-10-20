'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import useQuiz from '@/hooks/use-quiz';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import H1 from '@/components/ui/typography/h1';
import H3 from '@/components/ui/typography/h3';
import Prompt from '@/components/quiz/prompt';
import Results from '@/components/quiz/results';

const Quiz = () => {
  const { quizzes, currentQuizIndex } = useQuiz();

  return <>{currentQuizIndex >= quizzes.length ? <Results /> : <Prompt />}</>;
};

export default Quiz;
