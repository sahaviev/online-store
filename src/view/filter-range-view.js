import {AbstractFilterView} from './abstract-filter-view.js';

const createRangeFilterTemplate = (disabled = ``) => `<div class="filter__range">
  <label for="range">Цена, ₽</label>
  <input type="text" ${disabled} id="range">
</div>`;

export class FilterRangeView extends AbstractFilterView {
  constructor(disabled, priceRange, selectedRange) {
    super();
    this.disabled = disabled ? `disabled` : ``;
    this.priceRange = priceRange;
    this.selectedRange = selectedRange;

    this.renderSlider = this.renderSlider.bind(this);

    this.setAfterRenderHandler(this.renderSlider);
  }

  getTemplate() {
    return createRangeFilterTemplate(this.disabled);
  }

  removeElement() {
    this.slider.destroy();
    super.removeElement();
  }

  renderSlider() {
    // eslint-disable-next-line new-cap
    this.slider = new rSlider({
      target: this.getElement().querySelector(`#range`),
      values: this.priceRange,
      set: this.selectedRange,
      step: 10000,
      range: true,
      tooltip: true,
      scale: false,
      labels: false,
      disabled: this.disabled,
      onChange: (values) => {
        this.callbacks.valueFilterChange(values);
      },
    });
  }

  setDisabled(disabled) {
    this.slider.disabled(disabled);
  }
}
