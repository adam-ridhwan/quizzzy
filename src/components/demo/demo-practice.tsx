'use client';

import useQuiz from '@/hooks/use-quiz';
import DemoPrompt from '@/components/demo/demo-prompt';
import DemoResults from '@/components/demo/demo-results';

const DemoPractice = () => {
  const { quizzes, currentQuizIndex } = useQuiz();

  return (
    <>
      <main className='flex flex-1 justify-center gap-4'>
        {currentQuizIndex >= quizzes.length ? <DemoResults /> : <DemoPrompt />}
      </main>
    </>
  );
};

export default DemoPractice;
