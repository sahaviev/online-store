import {remove, render, replace} from '../utils/render.js';
import {categories, UpdateType} from '../const.js';

import {CategoriesView} from '../view/categories-view.js';

export class CategoriesPresenter {
  constructor(categoriesContainer, categoryModel, favoritesModel) {
    this.categoriesContainer = categoriesContainer;
    this.categoryModel = categoryModel;
    this.favoritesModel = favoritesModel;

    this.categoriesComponent = null;

    this.handleCategoryModelEvent = this.handleCategoryModelEvent.bind(this);
    this.handleFavoritesModelEvent = this.handleFavoritesModelEvent.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  init() {
    this.selectedCategory = this.categoryModel.getCategory();
    this.disabled = this.favoritesModel.getShowFavorites() === true;

    this.categoryModel.addSubscriber(this.handleCategoryModelEvent);
    this.favoritesModel.addSubscriber(this.handleFavoritesModelEvent);

    this.renderCategories();
  }

  renderCategories() {
    const previous = this.categoriesComponent;

    this.categoriesComponent = new CategoriesView(categories, this.selectedCategory, this.disabled);
    this.categoriesComponent.setCategoryChangeHandler(this.handleCategoryChange);

    if (previous === null) {
      render(this.categoriesContainer, this.categoriesComponent);
      return;
    }

    replace(this.categoriesComponent, previous);
    remove(previous);
  }

  handleFavoritesModelEvent() {
    this.disabled = this.favoritesModel.getShowFavorites() === true;
    this.renderCategories();
  }

  handleCategoryModelEvent() {
    this.selectedCategory = this.categoryModel.getCategory();
  }

  handleCategoryChange(category) {
    if (this.selectedCategory !== category) {
      this.categoryModel.setCategory(UpdateType.MAJOR, category);
    }
  }
}
