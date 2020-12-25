import {AbstractView} from './abstract-view.js';

export class FiltersShowButtonView extends AbstractView {
  constructor(disabled) {
    super();
    this.disabled = disabled;

    this.showButtonClickHandler = this.showButtonClickHandler.bind(this);
  }

  getTemplate() {
    return `<form class="filter__form" action="#" method="post">
  <button class="button filter__button" type="submit" id="filter-button" ${this.disabled ? `disabled` : ``}>Показать</button>
</form>`;
  }

  showButtonClickHandler(evt) {
    evt.preventDefault();
    this.callbacks.showButtonClick();
  }

  setShowButtonClickHandler(callback) {
    this.callbacks.showButtonClick = callback;
    this.getElement().addEventListener(`submit`, this.showButtonClickHandler);
  }
}
