import { AbstractView } from './abstract-view.js';

export class SortingOrderView extends AbstractView {
  constructor() {
    super();
    this.sortingOrderChangeHandler = this.sortingOrderChangeHandler.bind(this);
  }

  getTemplate() {
    return `<fieldset class="sorting__order">
        <legend>Показать сначала:</legend>
        <ul class="sorting__order-list">
          <li class="sorting__order-tab">
            <input class="visually-hidden" type="radio" name="sorting-order" value="popular" id="sort-popular" checked>
            <label for="sort-popular">Популярные</label>
          </li>
          <li class="sorting__order-tab">
            <input class="visually-hidden" type="radio" name="sorting-order" value="cheap" id="sort-cheap">
            <label for="sort-cheap">Дешёвые</label>
          </li>
          <li class="sorting__order-tab">
            <input class="visually-hidden" type="radio" name="sorting-order" value="new" id="sort-new">
            <label for="sort-new">Новые</label>
          </li>
        </ul>
      </fieldset>`;
  }

  sortingOrderChangeHandler(evt) {
    evt.preventDefault();
    this.callbacks.sortingOrderChange(evt.target.value);
  }

  setSortingOrderChangeHandler(callback) {
    this.callbacks.sortingOrderChange = callback;
    this.getElement().querySelector('.sorting__order-list').addEventListener('change', this.sortingOrderChangeHandler);
  }
}