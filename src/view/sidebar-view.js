import {AbstractView} from './abstract-view.js';

const createSidebarTemplate = () => `<section class="onlineshop-app__filter filter">
    <h2 class="title filter__title">Фильтр</h2>
    <div class="filter__categories"></div>
    <div class="filter__category-filters"></div>
</section>`;

export class SidebarView extends AbstractView {
  getCategoriesContainer() {
    return this.getElement().querySelector(`.filter__categories`);
  }

  getCategoryFiltersContainer() {
    return this.getElement().querySelector(`.filter__category-filters`);
  }

  getTemplate() {
    return createSidebarTemplate();
  }
}
