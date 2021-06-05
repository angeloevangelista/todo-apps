class LocalStorageFake implements Storage {
  private _storage: { [key: string]: string } = {};

  constructor() {
    this.length = 0;
  }

  public get length(): number {
    return Object.keys(this._storage).length;
  }

  public set length(value: number) {
    this.length = value;
  }

  clear(): void {
    this._storage = {};
  }

  key(index: number): string | null {
    return Object.keys(this._storage)[index];
  }

  setItem(key: string, value: string) {
    this._storage[key] = value;
  }

  getItem(key: string) {
    return this._storage[key];
  }

  removeItem(key: string): void {
    delete this._storage[key];
  }
}

export type { LocalStorageFake };
