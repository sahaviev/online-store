// eslint-disable-next-line import/no-cycle
import {createElement} from '../utils/render.js';

export class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one.`);
    }

    this.element = null;
    this.callbacks = {};
  }

  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    throw new Error(`AbstractView method not implemented: getTemplate`);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }

  setBeforeRenderHandler(callback) {
    this.callbacks.beforeRender = callback;
  }

  setAfterRenderHandler(callback) {
    this.callbacks.afterRender = callback;
  }

  handleBeforeRenderCallback() {
    if (typeof this.callbacks.beforeRender === `function`) {
      this.callbacks.beforeRender();
    }
  }

  handleAfterRenderCallback() {
    if (typeof this.callbacks.afterRender === `function`) {
      this.callbacks.afterRender();
    }
  }
}
