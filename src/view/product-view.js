import { AbstractView } from './abstract-view.js';

export class ProductView extends AbstractView {
  getSortingContainer() {
    return this.getElement().querySelector('.sorting__form');
  }

  getProductListContainer() {
    return this.getElement().querySelector('.results__list');
  }

  getTemplate() {
    return `<section class="onlineshop-app__results results">
        <div class="results__head">
          <h2 class="title results__title">Результаты</h2>
          <div class="results__sorting sorting">
            <form class="sorting__form"></form>
          </div>
        </div>
        <div class="results__list"></div>
    </section>`;
  }
}
