import { Textarea } from '@/components/ui/textarea';
import H3 from '@/components/ui/typography/h3';
import QuestionType from '@/components/quiz-builder/question-type';

type Props = {
  questionNumber: number;
};

const Question = ({ questionNumber }: Props) => {
  return (
    <>
      <div className='flex flex-col gap-1'>
        <div className='flex justify-between'>
          <H3>{`Question ${questionNumber}`}</H3>
        </div>

        <Textarea className='min-h-[100px] resize-none' />
      </div>
    </>
  );
};

export default Question;
