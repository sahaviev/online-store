import { CategoryType, UpdateType } from '../const';
import { remove, render, replace } from '../utils/render';

import { FilterAllView } from '../view/filter-all-view';
import { FilterCameraView } from '../view/filter-camera-view';
import { FilterCarsView } from '../view/filter-cars-view';
import { FilterEstateView } from '../view/filter-estate-view';
import { FilterLaptopView } from '../view/filter-laptop-view';
import { FilterRangeView } from '../view/filter-range-view';
import { FiltersShowButtonView } from '../view/filters-show-button-view';

export class FiltersPresenter {
  constructor(filtersContainer, categoryModel, favoritesModel, filterModel) {
    this.filtersContainer = filtersContainer;

    this.categoryModel = categoryModel;
    this.favoritesModel = favoritesModel;
    this.filterModel = filterModel;

    this.rangeFilterComponent = null;
    this.filtersComponent = null;
    this.filterShowButtonComponent = null;

    this.selectedFilters = {};

    this.handleCategoryModelEvent = this.handleCategoryModelEvent.bind(this);
    this.handleFavoritesModelEvent = this.handleFavoritesModelEvent.bind(this);

    this.handlerCheckboxFilterChange = this.handlerCheckboxFilterChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleShowButtonClick = this.handleShowButtonClick.bind(this);
  }

  init() {
    this.selectedCategory = this.categoryModel.getCategory();
    this.disabled = this.favoritesModel.getShowFavorites() === true;

    this.categoryModel.addSubscriber(this.handleCategoryModelEvent);
    this.favoritesModel.addSubscriber(this.handleFavoritesModelEvent);

    this.renderFilters();
  }

  renderRangeFilter() {
    const previous = this.rangeFilterComponent;
    this.rangeFilterComponent = new FilterRangeView(this.disabled);

    if (previous === null) {
      render(this.filtersContainer, this.rangeFilterComponent);
      return;
    }

    replace(this.rangeFilterComponent, previous);
    remove(previous);
  }

  renderCategoryFilters() {
    const previous = this.filtersComponent;

    const CategoryFiltersView = this.getCategoryFiltersView();
    this.filtersComponent = new CategoryFiltersView(this.disabled, this.selectedFilters);
    this.filtersComponent.setCheckboxFilterChangeHandler(this.handlerCheckboxFilterChange);
    this.filtersComponent.setFilterChangeHandler(this.handleFilterChange);

    if (previous === null) {
      render(this.filtersContainer, this.filtersComponent);
      return;
    }

    replace(this.filtersComponent, previous);
    remove(previous);
  }

  renderFilterShowButton() {
    const previous = this.filterShowButtonComponent;

    this.filterShowButtonComponent = new FiltersShowButtonView(this.disabled);
    this.filterShowButtonComponent.setShowButtonClickHandler(this.handleShowButtonClick);

    if (previous === null) {
      render(this.filtersContainer, this.filterShowButtonComponent);
      return;
    }

    replace(this.filterShowButtonComponent, previous);
    remove(previous);
  }

  renderFilters() {
    this.renderRangeFilter();
    this.renderCategoryFilters();
    this.renderFilterShowButton();
  }

  getCategoryFiltersView() {
    switch (this.selectedCategory) {
      case CategoryType.ALL:
        return FilterAllView;
      case CategoryType.ESTATE:
        return FilterEstateView;
      case CategoryType.LAPTOPS:
        return FilterLaptopView;
      case CategoryType.CAMERA:
        return FilterCameraView;
      case CategoryType.CARS:
        return FilterCarsView;
      default:
        return FilterAllView;
    }
  }

  handleFavoritesModelEvent() {
    this.disabled = this.favoritesModel.getShowFavorites() === true;
    this.renderFilters();
  }

  handleCategoryModelEvent() {
    this.selectedCategory = this.categoryModel.getCategory();
    this.selectedFilters = {};
    this.renderRangeFilter();
    this.renderCategoryFilters();
  }

  handlerCheckboxFilterChange(name, value, checked) {
    if (!this.selectedFilters[name]) {
      this.selectedFilters[name] = [];
    }
    if (checked) {
      this.selectedFilters[name].push(value);
    }
    if (!checked) {
      this.selectedFilters[name] = this.selectedFilters[name].filter(
        (item) => item !== value,
      );
    }
  }

  handleFilterChange(name, value) {
    this.selectedFilters[name] = value;
  }

  handleShowButtonClick() {
    this.filterModel.setFilters(UpdateType.MAJOR, this.selectedFilters);
  }
}
