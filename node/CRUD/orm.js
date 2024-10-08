import { existsSync, readFileSync, writeFileSync } from "fs";

class ORM {
  constructor(filePath) {
    this.filePath = filePath;
    this.loadData();
  }

  loadData() {
    if (existsSync(this.filePath)) {
      const data = readFileSync(this.filePath);
      this.data = JSON.parse(data);
    } else {
      this.data = { events: [], favorites: [] };
    }
  }

  saveData() {
    writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }

  create(item) {
    item.id = this.data.events.length
      ? this.data.events[this.data.events.length - 1].id + 1
      : 1;
    this.data.events.push(item);
    this.saveData();
    return item;
  }

  read(id) {
    if (id) {
      return this.data.events.find((item) => item.id === id) || null;
    }
    return this.data.events;
  }

  update(id, updatedItem) {
    const index = this.data.events.findIndex((item) => item.id === id);
    if (index === -1) return null;

    this.data.events[index] = { ...this.data.events[index], ...updatedItem };
    this.saveData();
    return this.data.events[index];
  }

  delete(id) {
    const index = this.data.events.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const deletedItem = this.data.events.splice(index, 1);
    this.saveData();
    return deletedItem[0];
  }

  addFavorite(id) {
    const event = this.read(id);
    if (event && !this.data.favorites.some((fav) => fav.id === id)) {
      this.data.favorites.push(event);
      this.saveData();
      return event;
    }
    return null;
  }

  removeFavorite(id) {
    const index = this.data.favorites.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const removedFavorite = this.data.favorites.splice(index, 1);
    this.saveData();
    return removedFavorite[0];
  }

  getFavorites() {
    return this.data.favorites;
  }
}

export default ORM;
