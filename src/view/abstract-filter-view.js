import {AbstractView} from './abstract-view.js';

export class AbstractFilterView extends AbstractView {
  constructor() {
    super();
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleCheckboxFilterChange = this.handleCheckboxFilterChange.bind(this);
  }

  setFilterChangeHandler(callback) {
    this.callbacks.valueFilterChange = callback;
  }

  setCheckboxFilterChangeHandler(callback) {
    this.callbacks.checkboxFilterChange = callback;
  }

  handleFilterChange(evt) {
    this.callbacks.valueFilterChange(evt.target.name, evt.target.value);
  }

  handleCheckboxFilterChange(evt) {
    this.callbacks.checkboxFilterChange(evt.target.name, evt.target.value, evt.target.checked);
  }
}
