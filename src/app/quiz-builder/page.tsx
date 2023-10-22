import H1 from '@/components/ui/typography/h1';
import H2 from '@/components/ui/typography/h2';
import Choices from '@/components/quiz-builder/choices';
import Question from '@/components/quiz-builder/question';
import QuestionType from '@/components/quiz-builder/question-type';
import QuizBuilder from '@/components/quiz-builder/quiz-builder';

const QuizBuilderPage = () => {
  return (
    <>
      <div className='mt-5 flex flex-col gap-8'>
        <H2>Quiz builder</H2>

        <QuizBuilder />
      </div>
    </>
  );
};

export default QuizBuilderPage;
