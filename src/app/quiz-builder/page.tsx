import H2 from '@/components/ui/typography/h2';
import QuizBuilder from '@/components/quiz-builder/quiz-builder';
import QuizBuilderSettings from '@/components/quiz-builder/quiz-builder-settings';

const QuizBuilderPage = () => {
  return (
    <>
      <div className='mt-5 flex flex-col gap-8'>
        <H2>Quiz builder</H2>

        <QuizBuilderSettings />

        <QuizBuilder />
      </div>
    </>
  );
};

export default QuizBuilderPage;
