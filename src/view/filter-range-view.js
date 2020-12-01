import { AbstractView } from '../utils/abstract-view.js';

export class FilterRangeView extends AbstractView {
  getTemplate() {
    return `<div class="filter__range">
  <label for="range">Цена, ₽</label>
  <input type="range" min="0" max="6000000" id="range">
</div>`;
  }
}
