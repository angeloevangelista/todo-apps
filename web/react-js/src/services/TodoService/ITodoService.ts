import { ITodoItem } from '../../shared/models/ITodoItem';

interface ITodoService {
  listTodos(): Promise<ITodoItem[]>;
  createTodo(partialTodoItem: Partial<ITodoItem>): Promise<ITodoItem>;
  deleteTodos(todoIds: string[]): Promise<void>;
  updateTodo(todoItem: ITodoItem): Promise<ITodoItem>;
}

export type { ITodoService };
