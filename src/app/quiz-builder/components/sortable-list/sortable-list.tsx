import React, { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { DndContext, KeyboardSensor, Over, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { Active, UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import './sortable-list.styles.css';

import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import { DragHandle, SortableItem } from '@/app/quiz-builder/components/sortable-item/sortable-item';
import { SortableOverlay } from '@/app/quiz-builder/components/sortable-overlay/sortable-overlay';

interface BaseItem {
  id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
  items: T[];
  onChange(items: T[]): void;
  renderItem(item: T): ReactNode;
}

export function SortableList<T extends BaseItem>({ items, onChange, renderItem }: Props<T>) {
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(() => items.find(item => item.id === active?.id), [active, items]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragEnd = (active: Active, over: Over | null) => {
    if (over && active.id !== over?.id) {
      const activeIndex = items.findIndex(({ id }) => id === active.id);
      const overIndex = items.findIndex(({ id }) => id === over.id);

      onChange(arrayMove(items, activeIndex, overIndex));
    }
    setActive(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => setActive(active)}
      onDragCancel={() => setActive(null)}
      onDragEnd={({ active, over }) => onDragEnd(active, over)}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={items}>
        <ul className='SortableList' role='application'>
          {items.map(item => (
            <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
          ))}
        </ul>
      </SortableContext>
      <SortableOverlay>{activeItem ? renderItem(activeItem) : null}</SortableOverlay>
    </DndContext>
  );
}

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;
