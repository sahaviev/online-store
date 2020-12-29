export class LocalStorageWrapper {
  constructor(prefix) {
    this.prefix = `${prefix}@`;
  }

  save(key, value) {
    localStorage.setItem(this.prefix + key, JSON.stringify(value));
    return true;
  }

  fetch(key) {
    try {
      const data = localStorage.getItem(this.prefix + key);
      if (data === null) {
        return null;
      }
      return JSON.parse(data);
    } catch (exception) {
      console.error(exception);
    }
    return null;
  }

  delete(key) {
    localStorage.removeItem(this.prefix + key);
  }

  rowsCount() {
    return localStorage.length;
  }

  drop() {
    const rowsCount = this.rowsCount();

    for (let i = 0; i < rowsCount; i += 1) {
      const key = localStorage.key(i);

      if (key.startsWith(this.prefix)) {
        this.delete(key);
      }
    }
  }

  dropAll() {
    localStorage.clear();
  }
}
