import React, { useCallback, useMemo } from 'react';
import { FiTrash } from 'react-icons/fi';

import { Button } from '../Button';
import { ITodoItem } from '../../shared/models/ITodoItem';

import * as SC from './styles';
import { useTodo } from '../../hooks/TodoContext';

enum EChecklistMode {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

interface ICheckListProps {
  items: ITodoItem[];
  mode: EChecklistMode;
}

const Checklist: React.FC<ICheckListProps> = ({ items, mode }) => {
  const { completeTodo, reActivateTodo, removeTodos } = useTodo();

  const filteredItems = useMemo<ITodoItem[]>(() => {
    let treatedItems = [];

    switch (mode) {
      case EChecklistMode.active:
        treatedItems = items.filter((p) => !p.completed);
        break;
      case EChecklistMode.completed:
        treatedItems = items.filter((p) => p.completed);
        break;
      default:
        treatedItems = items;
        break;
    }

    treatedItems = treatedItems
      .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
      .sort((a, b) => (a.completed ? 1 : -1));

    return treatedItems;
  }, [items, mode]);

  const handleDeleteAllItems = useCallback(async () => {
    await removeTodos(filteredItems.map((p) => p.id));
  }, [filteredItems, removeTodos]);

  const handleDeleteItem = useCallback(
    async (itemId: string) => {
      await removeTodos([itemId]);
    },
    [removeTodos],
  );

  const handleChangeItemState = useCallback(
    async (itemId: string) => {
      const item = items.find((p) => p.id === itemId);

      if (!item) throw new Error('Item not found.');

      item.completed = !item.completed;

      if (item.completed) await completeTodo(item);
      else await reActivateTodo(item);
    },
    [items, completeTodo, reActivateTodo],
  );

  return (
    <SC.Container>
      <SC.Checklist>
        {filteredItems &&
          filteredItems.map((item) => (
            <li key={item.id}>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onClick={() => handleChangeItemState(item.id)}
                />

                <span {...(item.completed && { className: 'scratched' })}>
                  {item.title}
                </span>
              </div>

              {mode === EChecklistMode.completed && (
                <button onClick={() => handleDeleteItem(item.id)}>
                  <FiTrash size={24} color="#BDBDBD" />
                </button>
              )}
            </li>
          ))}
      </SC.Checklist>

      {mode === EChecklistMode.completed && (
        <Button
          onClick={handleDeleteAllItems}
          iconSize={16}
          iconAlign="left"
          icon={FiTrash}
          backgroundColor="#EB5757"
        >
          delete all
        </Button>
      )}
    </SC.Container>
  );
};

export { Checklist, EChecklistMode };
