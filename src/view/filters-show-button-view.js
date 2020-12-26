import {AbstractView} from './abstract-view.js';

export class FiltersShowButtonView extends AbstractView {
  constructor(disabled) {
    super();
    this.disabled = disabled;

    this.showButtonSubmitHandler = this.showButtonSubmitHandler.bind(this);
  }

  getTemplate() {
    return `<form class="filter__form" action="#" method="post">
  <button class="button filter__button" type="submit" id="filter-button" ${this.disabled ? `disabled` : ``}>Показать</button>
</form>`;
  }

  showButtonSubmitHandler(evt) {
    evt.preventDefault();
    this.callbacks.showButtonSubmit();
  }

  setShowButtonClickHandler(callback) {
    this.callbacks.showButtonSubmit = callback;
    this.getElement().addEventListener(`submit`, this.showButtonSubmitHandler);
  }
}
