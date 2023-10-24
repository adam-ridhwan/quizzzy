import { useMemo, useState } from 'react';
import {
  Active,
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { cn } from '@/lib/utils';
import { useQuizBuilder } from '@/hooks/use-quiz-builder';
import { SortableOverlay } from '@/app/quiz-builder/components/quiz-builder';
import { SortableQuestionItem } from '@/app/quiz-builder/components/sortable-question-item';

export const SortableQuestionList = () => {
  const { draftQuizzes, setDraftQuizzes } = useQuizBuilder();

  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(
    () => draftQuizzes.find(quiz => quiz._id === active?.id),
    [active, draftQuizzes]
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragEnd = (e: DragEndEvent) => {
    setActive(null);

    const { active, over } = e;

    if (!over || active.id === over.id) return;

    if (active.id === over.id) return;

    setDraftQuizzes(draftQuiz => {
      const oldIndex = draftQuiz.findIndex(quiz => quiz._id === active.id);
      const newIndex = draftQuiz.findIndex(quiz => quiz._id === over.id);

      return arrayMove(draftQuiz, oldIndex, newIndex);
    });
  };
  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={({ active }) => setActive(active)}
        onDragCancel={() => setActive(null)}
        onDragEnd={onDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={draftQuizzes.map(draftQuiz => draftQuiz._id)}>
          {draftQuizzes.map((draftQuiz, draftQuizIdx) => {
            return (
              <SortableQuestionItem
                key={draftQuiz._id}
                draftQuiz={draftQuiz}
                draftQuizIdx={draftQuizIdx}
                className={cn('', { 'opacity-20': activeItem?._id === draftQuiz._id })}
              />
            );
          })}
        </SortableContext>
        <SortableOverlay>
          {activeItem ? (
            <SortableQuestionItem
              key={activeItem._id}
              draftQuiz={activeItem}
              draftQuizIdx={draftQuizzes.indexOf(activeItem)}
            />
          ) : null}
        </SortableOverlay>
      </DndContext>
    </>
  );
};
