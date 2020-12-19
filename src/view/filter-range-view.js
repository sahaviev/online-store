import { AbstractFilterView } from './abstract-filter-view.js';

const createRangeFilterTemplate = (disabled = false) => `<div class="filter__range">
  <label for="range">Цена, ₽</label>
  <input type="text" ${disabled && 'disabled'} id="range">
</div>`;

export class FilterRangeView extends AbstractFilterView {
  constructor(disabled) {
    super();
    this.disabled = disabled;

    this.renderSlider = this.renderSlider.bind(this);

    this.setAfterRenderHandler(this.renderSlider);
  }

  renderSlider() {
    // eslint-disable-next-line no-undef,new-cap
    this.slider = new rSlider({
      target: this.getElement().querySelector('#range'),
      values: { min: 2000, max: 2021 },
      step: 1,
      range: true,
      tooltip: true,
      scale: false,
      labels: false,
      set: [2010, 2013],
      disabled: this.disabled,
    });
  }

  setFilterChangeHandler(callback) {
    super.setFilterChangeHandler(callback);
    this.getElement().querySelector('#range').addEventListener('change', this.handleFilterChange);
  }

  getTemplate() {
    return createRangeFilterTemplate(this.disabled);
  }
}
