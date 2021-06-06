import { v4 as uuidv4 } from 'uuid';

import { ITodoService } from '../ITodoService';
import { ITodoItem } from '../../../shared/models/ITodoItem';

class TodoServiceLocalStorage implements ITodoService {
  private readonly FAKE_TIMEOUT = 500;
  private readonly LOCAL_STORAGE_KEY = 'TODO_APP_REACT';

  private _todos: ITodoItem[];
  private static _serviceInstance: TodoServiceLocalStorage;

  private constructor() {
    this._todos = this.getTodosFromLocalStorage();
  }

  static getInstance() {
    return TodoServiceLocalStorage._serviceInstance
      ? TodoServiceLocalStorage._serviceInstance
      : new TodoServiceLocalStorage();
  }

  private getTodosFromLocalStorage(): ITodoItem[] {
    const rawStoredTodos =
      window.localStorage.getItem(this.LOCAL_STORAGE_KEY) || '[]';

    return JSON.parse(rawStoredTodos) || [];
  }

  private persistTodos(): void {
    window.localStorage.removeItem(this.LOCAL_STORAGE_KEY);

    window.localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify(this._todos),
    );
  }

  listTodos(): Promise<ITodoItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this._todos), this.FAKE_TIMEOUT);
    });
  }

  createTodo(partialTodoItem: Partial<ITodoItem>): Promise<ITodoItem> {
    return new Promise((resolve) => {
      const createdTodo: ITodoItem = {
        ...partialTodoItem,
        id: uuidv4(),
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as ITodoItem;

      this._todos.push(createdTodo);

      this.persistTodos();

      setTimeout(() => resolve(createdTodo), this.FAKE_TIMEOUT);
    });
  }

  deleteTodos(todoIds: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const storedTodoIds = this._todos.map((p) => p.id);

      const thereIsInvalidItem = todoIds.some(
        (p) => !storedTodoIds.includes(p),
      );

      if (thereIsInvalidItem) return reject('Invalid itens.');

      this._todos = this._todos.filter((p) => !todoIds.includes(p.id));

      this.persistTodos();

      setTimeout(() => resolve(), this.FAKE_TIMEOUT);
    });
  }

  updateTodo(todoItem: ITodoItem): Promise<ITodoItem> {
    return new Promise<ITodoItem>((resolve, reject) => {
      const todoIndex = this._todos.findIndex((p) => p.id === todoItem.id);

      if (todoIndex === -1) return reject('Todo not found.');

      let updatedTodo = this._todos[todoIndex];

      updatedTodo = {
        ...updatedTodo,
        ...todoItem,
        updatedAt: new Date(),
      };

      this._todos[todoIndex] = updatedTodo;

      this.persistTodos();

      setTimeout(() => resolve(updatedTodo), this.FAKE_TIMEOUT);
    });
  }
}

export { TodoServiceLocalStorage };
