import { AbstractView } from './abstract-view';

export class AppView extends AbstractView {
  getAppContainer() {
    return this.getElement().querySelector('.onlineshop-app__wrapper');
  }

  getTemplate() {
    return `<section class="onlineshop-app">
        <div class="onlineshop-app__blueline"></div>
        <div class="onlineshop-app__wrapper"></div>
    </section>`;
  }
}
