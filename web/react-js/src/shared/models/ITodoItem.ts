interface ITodoItem {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
}

export type { ITodoItem };
