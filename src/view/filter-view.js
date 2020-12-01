import { AbstractView } from '../utils/abstract-view.js';

export class FilterView extends AbstractView {
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
          <button class="button filter__button" type="submit">Показать</button>
        </form>
      </section>`;
  }
}
