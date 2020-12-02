import { AbstractView } from './abstract-view.js';

export class AbstractFilterView extends AbstractView {
  constructor() {
    super();
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(evt) {
    this.callbacks.filterChange(evt.target);
  }
}
