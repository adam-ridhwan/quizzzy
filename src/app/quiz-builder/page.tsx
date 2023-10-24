import H2 from '@/typography/h2';

import QuizBuilder from '@/app/quiz-builder/components/quiz-builder';
import QuizBuilderSettings from '@/app/quiz-builder/components/quiz-builder-settings';

const QuizBuilderPage = () => {
  return (
    <>
      <div className='mt-5 flex flex-col gap-8'>
        <div className='flex flex-row items-center justify-between'>
          <H2>Quiz builder</H2>

          <QuizBuilderSettings />
        </div>

        <QuizBuilder />
      </div>
    </>
  );
};

export default QuizBuilderPage;
