import React, { ForwardedRef, Ref, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  Over,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { Active, UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import './sortable-list.styles.css';

import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { atom, useAtom } from 'jotai';

import { useSortableWidth } from '@/hooks/use-sortable-width';
import { DragHandle, SortableItem } from '@/app/quiz-builder/components/sortable-item/sortable-item';

interface BaseItem {
  id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
  items: T[];
  onChange(items: T[]): void;
  renderItem(item: T): ReactNode;
}

export const activeAtom = atom<Active | null>(null);

export function SortableList<T extends BaseItem>({ items, onChange, renderItem }: Props<T>) {
  const [active, setActive] = useAtom(activeAtom);
  const sortableListRef = useRef<HTMLUListElement>(null);

  useSortableWidth(sortableListRef);

  const activeItem = useMemo(() => items.find(item => item.id === active?.id), [active, items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(e: DragStartEvent) {
    setActive(e.active);
  }

  function handleDragOver(e: DragOverEvent) {
    const { active, over } = e;

    if (over && active.id !== over.id) {
      const activeIndex = items.findIndex(({ id }) => id === active.id);
      const overIndex = items.findIndex(({ id }) => id === over.id);

      onChange(arrayMove(items, activeIndex, overIndex));
    }
  }

  function handleDragEnd() {
    setActive(null);
  }

  function disableSortingStrategy() {
    return null;
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragCancel={handleDragEnd}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={items} strategy={disableSortingStrategy}>
        <ul ref={sortableListRef} className='flex flex-col gap-12' role='application'>
          {items.map(item => (
            <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
          ))}
        </ul>
      </SortableContext>
      <DragOverlay>{activeItem ? renderItem(activeItem) : null}</DragOverlay>
    </DndContext>
  );
}

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;
