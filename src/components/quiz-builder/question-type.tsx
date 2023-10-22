'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const QuestionType = () => {
  return (
    <>
      <Select defaultValue='single'>
        <SelectTrigger className='w-[180px]'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='single'>Single</SelectItem>
          <SelectItem value='multi'>Multi</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default QuestionType;
