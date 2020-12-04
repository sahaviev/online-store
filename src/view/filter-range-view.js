import { AbstractFilterView } from './abstract-filter-view.js';

const createRangeFilterTemplate = () => `<div class="filter__range">
  <label for="range">Цена, ₽</label>
  <input name="range" type="range" min="0" max="6000000" id="range">
</div>`;

export class FilterRangeView extends AbstractFilterView {
  setFilterChangeHandler(callback) {
    super.setFilterChangeHandler(callback);
    this.getElement().querySelector('#range').addEventListener('change', this.handleFilterChange);
  }

  getTemplate() {
    return createRangeFilterTemplate();
  }
}
