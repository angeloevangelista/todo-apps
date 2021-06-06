import React, { useCallback, useMemo } from 'react';
import { FiTrash } from 'react-icons/fi';

import { useTodo } from '../../hooks/TodoContext';

import { Button } from '../Button';
import { ITodoItem } from '../../shared/models/ITodoItem';
import { ITodoService } from '../../services/TodoService/ITodoService';
import { TodoServiceLocalStorage } from '../../services/TodoService/implementations/TodoService';

import * as SC from './styles';
import { useLoader } from '../../hooks/LoaderContext';

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
  const { startLoader, stopLoader } = useLoader();

  const todoService = useMemo<ITodoService>(() => {
    return TodoServiceLocalStorage.getInstance();
  }, []);

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
    try {
      startLoader('Deleting todos');

      const itemIds = filteredItems.map((p) => p.id);

      await todoService.deleteTodos(itemIds);

      removeTodos(itemIds);
    } catch (error) {
      alert('Deu ruim, amigão 🔥🔥🔥');
      console.log(error);
    } finally {
      stopLoader();
    }
  }, [filteredItems, removeTodos, startLoader, stopLoader, todoService]);

  const handleDeleteItem = useCallback(
    async (itemId: string) => {
      try {
        startLoader('Deleting todo');

        await todoService.deleteTodos([itemId]);

        removeTodos([itemId]);
      } catch (error) {
        alert('Deu ruim, amigão 🔥🔥🔥');
        console.log(error);
      } finally {
        stopLoader();
      }
    },
    [removeTodos, startLoader, stopLoader, todoService],
  );

  const handleChangeItemState = useCallback(
    async (itemId: string) => {
      try {
        startLoader('Updating todo');

        const item = items.find((p) => p.id === itemId);

        if (!item) throw new Error('Item not found.');

        const updatedTodo = await todoService.updateTodo({
          ...item,
          completed: !item.completed,
        });

        if (updatedTodo.completed) completeTodo(updatedTodo);
        else reActivateTodo(updatedTodo);
      } catch (error) {
        alert('Deu ruim, amigão 🔥🔥🔥');
        console.log(error);
      } finally {
        stopLoader();
      }
    },
    [startLoader, completeTodo, reActivateTodo, stopLoader, items, todoService],
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
