export class LocalStorageHelper {
  static setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error setting localStorage item:', error);
    }
  }

  static getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      const serializedValue = localStorage.getItem(key);

      if (serializedValue === null) {
        return defaultValue ?? null;
      }
      
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error('Error getting localStorage item:', error);
      return defaultValue ?? null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.setItem(key, '');
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing localStorage item:', error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  static hasItem(key: string): boolean {
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error('Error checking localStorage item:', error);
      return false;
    }
  }
}