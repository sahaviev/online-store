import { AbstractModel } from './abstract-model';

export class FavoritesModel extends AbstractModel {
  constructor() {
    super();
    this.showFavorites = false;
  }

  setShowFavorites(updateType, showFavorites) {
    this.showFavorites = showFavorites;
    this.observer.notify(updateType, this.mode);
  }

  getShowFavorites() {
    return this.showFavorites;
  }
}
