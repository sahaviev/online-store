import {Observer} from '../utils/observer.js';

export class AbstractModel {
  constructor() {
    if (new.target === AbstractModel) {
      throw new Error(`Can't instantiate AbstractModel, only concrete one.`);
    }

    this.observer = new Observer();
  }

  addSubscriber(subscriber) {
    this.observer.subscribe(subscriber);
  }
}
