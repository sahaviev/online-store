import { AbstractFilterView } from './abstract-filter-view.js';

const createRangeFilterTemplate = (disabled = false) => `<div class="filter__range">
  <label for="range">Цена, ₽</label>
  <input name="range" type="range" min="0" max="6000000" ${disabled && 'disabled'} id="range">
</div>`;

export class FilterRangeView extends AbstractFilterView {
  constructor(disabled) {
    super();
    this.disabled = disabled;
  }

  setFilterChangeHandler(callback) {
    super.setFilterChangeHandler(callback);
    this.getElement().querySelector('#range').addEventListener('change', this.handleFilterChange);
  }

  getTemplate() {
    return createRangeFilterTemplate(this.disabled);
  }
}
