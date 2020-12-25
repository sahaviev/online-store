import {AbstractModel} from './abstract-model.js';
import {CategoryType} from '../const.js';

export class CategoryModel extends AbstractModel {
  constructor() {
    super();
    this.activeCategory = CategoryType.ALL;
  }

  setCategory(updateType, category) {
    this.activeCategory = category;
    this.observer.notify(updateType, category);
  }

  getCategory() {
    return this.activeCategory;
  }
}
