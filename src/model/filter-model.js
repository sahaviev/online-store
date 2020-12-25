import {AbstractModel} from './abstract-model.js';

export class FilterModel extends AbstractModel {
  constructor() {
    super();
    this.filters = {};
  }

  setFilters(updateType, filters) {
    this.filters = filters;
    this.observer.notify(updateType, filters);
  }

  getFilters() {
    return this.filters;
  }
}
