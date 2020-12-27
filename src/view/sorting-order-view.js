import {AbstractView} from './abstract-view.js';

const createSortingOrderTemplate = (disabled = ``, selectedSortingOrder) => `<fieldset class="sorting__order">
        <legend>Показать сначала:</legend>
        <ul class="sorting__order-list">
          <li class="sorting__order-tab">
            <input
                class="visually-hidden"
                type="radio"
                name="sorting-order"
                value="popular"
                ${disabled}
                ${selectedSortingOrder === `popular` ? `checked` : ``}
                id="sort-popular"
            />
            <label for="sort-popular">Популярные</label>
          </li>
          <li class="sorting__order-tab">
            <input
                class="visually-hidden"
                type="radio"
                name="sorting-order"
                value="cheap"
                ${disabled}
                ${selectedSortingOrder === `cheap` ? `checked` : ``}
                id="sort-cheap"
            />
            <label for="sort-cheap">Дешёвые</label>
          </li>
          <li class="sorting__order-tab">
            <input
                class="visually-hidden"
                type="radio"
                name="sorting-order"
                value="new"
                ${disabled}
                ${selectedSortingOrder === `new` ? `checked` : ``}
                id="sort-new"
            />
            <label for="sort-new">Новые</label>
          </li>
        </ul>
      </fieldset>`;

export class SortingOrderView extends AbstractView {
  constructor(disabled, selectedSortingOrder) {
    super();
    this.disabled = disabled ? `disabled` : ``;
    this.selectedSortingOrder = selectedSortingOrder;

    this.sortingOrderChangeHandler = this.sortingOrderChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortingOrderTemplate(this.disabled, this.selectedSortingOrder);
  }

  setSortingOrderChangeHandler(callback) {
    this.callbacks.sortingOrderChange = callback;
    this.getElement().querySelector(`.sorting__order-list`).addEventListener(`change`, this.sortingOrderChangeHandler);
  }

  sortingOrderChangeHandler(evt) {
    evt.preventDefault();
    this.callbacks.sortingOrderChange(evt.target.value);
  }
}
