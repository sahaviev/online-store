import { CategoryType, UpdateType } from '../const';
import { remove, render, replace } from '../utils/render';

import { FilterRangeView } from '../view/filter-range-view';
import { FilterEstateView } from '../view/filter-estate-view';
import { FilterLaptopView } from '../view/filter-laptop-view';
import { FilterCameraView } from '../view/filter-camera-view';
import { FilterCarsView } from '../view/filter-cars-view';

export class FiltersPresenter {
  constructor(sidebarComponent, categoryModel, favoritesModel, filterModel) {
    this.sidebarComponent = sidebarComponent;
    this.categoryModel = categoryModel;
    this.filterModel = filterModel;
    this.favoritesModel = favoritesModel;

    this.filters = {};

    this.handleModelEvent = this.handleModelEvent.bind(this);
    this.handleFilterButtonClick = this.handleFilterButtonClick.bind(this);
    this.handlerCheckboxFilterChange = this.handlerCheckboxFilterChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  init() {
    this.currentCategory = this.categoryModel.getCategory();
    const disabled = this.favoritesModel.getShowFavorites() === true;

    const FilterView = this.getFilterView();

    this.filtersComponent = new FilterView(disabled);
    this.filtersComponent.setCheckboxFilterChangeHandler(this.handlerCheckboxFilterChange);
    this.filtersComponent.setFilterChangeHandler(this.handleFilterChange);

    render(this.sidebarComponent.getCategoryFiltersContainer(), this.filtersComponent);

    this.sidebarComponent.setFilterButtonClickHandler(this.handleFilterButtonClick);
    this.categoryModel.addSubscriber(this.handleModelEvent);
    this.favoritesModel.addSubscriber(this.handleModelEvent);
  }

  renderFilters() {
    this.currentCategory = this.categoryModel.getCategory();
    const disabled = this.favoritesModel.getShowFavorites() === true;

    const FilterView = this.getFilterView();

    const previous = this.filtersComponent;
    this.filtersComponent = new FilterView(disabled);
    this.filtersComponent.setCheckboxFilterChangeHandler(this.handlerCheckboxFilterChange);
    this.filtersComponent.setFilterChangeHandler(this.handleFilterChange);

    this.filters = {};

    replace(this.filtersComponent, previous);
    remove(previous);
  }

  getFilterView() {
    switch (this.currentCategory) {
      case CategoryType.ALL:
        return FilterRangeView;
      case CategoryType.ESTATE:
        return FilterEstateView;
      case CategoryType.LAPTOPS:
        return FilterLaptopView;
      case CategoryType.CAMERA:
        return FilterCameraView;
      case CategoryType.CARS:
        return FilterCarsView;
      default:
        return FilterRangeView;
    }
  }

  handleModelEvent() {
    this.renderFilters();
  }

  handleFilterButtonClick() {
    this.filterModel.setFilters(UpdateType.MAJOR, this.filters);
  }

  handlerCheckboxFilterChange(name, value, checked) {
    if (!this.filters[name]) {
      this.filters[name] = [];
    }
    if (checked) {
      this.filters[name].push(value);
    }
    if (!checked) {
      this.filters[name] = this.filters[name].filter(
        (item) => item !== value,
      );
    }
  }

  handleFilterChange(name, value) {
    this.filters[name] = value;
  }
}
