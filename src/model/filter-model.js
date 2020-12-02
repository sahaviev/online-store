import { AbstractModel } from './abstract-model';

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
