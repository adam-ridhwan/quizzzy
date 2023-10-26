import { AddQuizButton } from '@/app/quiz-builder/components/buttons/add-quiz-button';
import { PublishQuizButton } from '@/app/quiz-builder/components/buttons/publish-button';
import { ResetQuizButton } from '@/app/quiz-builder/components/buttons/reset-quiz-button';
import QuizBuilder from '@/app/quiz-builder/quiz-builder';

const QuizBuilderPage = () => {
  return (
    <>
      <div className='mb-16 mt-5 flex flex-col gap-8'>
        <div className='flew-row flex items-center justify-end gap-2'>
          <ResetQuizButton />
          <PublishQuizButton />
        </div>

        <QuizBuilder />

        <AddQuizButton />
      </div>
    </>
  );
};

export default QuizBuilderPage;
