import { AbstractView } from './abstract-view.js';

export class FilterView extends AbstractView {
  constructor() {
    super();
    this.filterButtonClickHandler = this.filterButtonClickHandler.bind(this);
  }

  getCategoriesContainer() {
    return this.getElement().querySelector('.filter__categories');
  }

  getCategoryFiltersContainer() {
    return this.getElement().querySelector('.filter__category-filters');
  }

  getTemplate() {
    return `<section class="onlineshop-app__filter filter">
      <h2 class="title filter__title">Фильтр</h2>
      <div class="filter__categories"></div>
      <div class="filter__category-filters"></div>
      <form class="filter__form" action="#" method="post">
          <button class="button filter__button" type="submit" id="filter-button">Показать</button>
        </form>
      </section>`;
  }

  filterButtonClickHandler(evt) {
    evt.preventDefault();
    this.callbacks.filterButtonClick();
  }

  setFilterButtonClickHandler(callback) {
    this.callbacks.filterButtonClick = callback;
    this.getElement().querySelector('.filter__form').addEventListener('submit', this.filterButtonClickHandler);
  }
}
