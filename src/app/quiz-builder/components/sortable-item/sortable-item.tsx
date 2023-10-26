import React, { createContext, useContext, useMemo } from 'react';
import type { CSSProperties, PropsWithChildren } from 'react';
import type { Active, DraggableSyntheticListeners, UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Button } from '@/components/ui/button';

import './sortable-list.styles.css';

import { useAtomValue } from 'jotai';

import { cn } from '@/lib/utils';
import { Action } from '@radix-ui/react-alert-dialog';
import { activeAtom } from '@/app/quiz-builder/components/sortable-list/sortable-list';

interface Props {
  id: UniqueIdentifier;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
  active: Active | null;
  id: UniqueIdentifier;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
  active: null,
  id: '',
});

export function SortableItem({ children, id }: PropsWithChildren<Props>) {
  const active = useAtomValue(activeAtom);

  const { attributes, isDragging, listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({ id });

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
      active,
      id,
    }),
    [active, attributes, id, listeners, setActivatorNodeRef]
  );

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableItemContext.Provider value={context}>
      <li className='SortableItem' ref={setNodeRef} style={style}>
        {children}
      </li>
    </SortableItemContext.Provider>
  );
}

export function DragHandle() {
  const { attributes, listeners, ref, active, id } = useContext(SortableItemContext);

  return (
    <Button
      variant='secondary'
      size='icon'
      className={cn('DragHandle select-none', {
        'bg-secondary/80': active?.id === id,
      })}
      {...attributes}
      {...listeners}
      ref={ref}
    >
      <svg viewBox='0 0 20 20' className='h-5 w-5 fill-muted-foreground'>
        <path d='M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z'></path>
      </svg>
    </Button>
  );
}
