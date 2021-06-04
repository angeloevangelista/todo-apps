import React, { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { Button } from '../Button';

import * as SC from './styles';

interface IItem {
  id: string;
  title: string;
  completed: boolean;
}

enum EChecklistMode {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

interface ICheckListProps {
  items: IItem[];
  mode: EChecklistMode;
}

const Checklist: React.FC<ICheckListProps> = ({ items, mode }) => {
  const [filteredItems, setFilteredItems] = useState<IItem[]>([]);

  useEffect(() => {
    switch (mode) {
      case EChecklistMode.active:
        setFilteredItems(items.filter((p) => !p.completed));
        break;
      case EChecklistMode.completed:
        setFilteredItems(items.filter((p) => p.completed));
        break;
      default:
        setFilteredItems(items);
        break;
    }
  }, [mode, items]);

  return (
    <SC.Container>
      <SC.Checklist>
        {filteredItems.map((item) => (
          <li key={item.id}>
            <div>
              <input type="checkbox" checked={item.completed} />

              <span {...(item.completed && { className: 'scratched' })}>
                {item.title}
              </span>
            </div>

            {mode === EChecklistMode.completed && (
              <button>
                <FiTrash size={24} color="#BDBDBD" />
              </button>
            )}
          </li>
        ))}
      </SC.Checklist>

      {mode === EChecklistMode.completed && (
        <Button
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
