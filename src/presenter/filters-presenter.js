import {CategoryType, UpdateType} from '../const.js';
import {remove, render, replace} from '../utils/render.js';
import {getCategoryProducts, getProductsPriceRanges} from '../utils/product-filters.js';

import {FilterAllView} from '../view/filter-all-view.js';
import {FilterCameraView} from '../view/filter-camera-view.js';
import {FilterCarsView} from '../view/filter-cars-view.js';
import {FilterEstateView} from '../view/filter-estate-view.js';
import {FilterLaptopView} from '../view/filter-laptop-view.js';
import {FilterRangeView} from '../view/filter-range-view.js';
import {FiltersShowButtonView} from '../view/filters-show-button-view.js';

const getSelectedRange = ({minPrice, maxPrice}) => minPrice && maxPrice ? [minPrice, maxPrice] : [0, 0];

export class FiltersPresenter {
  constructor({
    filtersContainer,
    categoryModel,
    favoritesModel,
    filterModel,
    productsModel,
  }) {
    this.filtersContainer = filtersContainer;

    this.categoryModel = categoryModel;
    this.favoritesModel = favoritesModel;
    this.filterModel = filterModel;
    this.productsModel = productsModel;

    this.rangeFilterComponent = null;
    this.filtersComponent = null;
    this.filterShowButtonComponent = null;

    this.selectedFilters = {};

    this.handleProductsModelEvent = this.handleProductsModelEvent.bind(this);
    this.handleCategoryModelEvent = this.handleCategoryModelEvent.bind(this);
    this.handleFavoritesModelEvent = this.handleFavoritesModelEvent.bind(this);

    this.handleCheckboxFilterChange = this.handleCheckboxFilterChange.bind(this);
    this.handleRangeFilterChange = this.handleRangeFilterChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleShowButtonClick = this.handleShowButtonClick.bind(this);
  }

  init() {
    this.selectedCategory = this.categoryModel.getCategory();
    this.disabled = this.favoritesModel.getShowFavorites() === true;

    this.categoryModel.addSubscriber(this.handleCategoryModelEvent);
    this.favoritesModel.addSubscriber(this.handleFavoritesModelEvent);
    this.productsModel.addSubscriber(this.handleProductsModelEvent);

    this.renderFilters();
  }

  renderRangeFilter() {
    const previous = this.rangeFilterComponent;

    const products = this.selectedCategory !== CategoryType.ALL
      ? getCategoryProducts(this.productsModel.getProducts(), this.selectedCategory)
      : this.productsModel.getProducts();

    const priceRanges = products.length > 0 ? getProductsPriceRanges(products) : {min: 0, max: 0};

    this.rangeFilterComponent = new FilterRangeView(
        this.disabled, priceRanges, getSelectedRange(this.selectedFilters),
    );
    this.rangeFilterComponent.setFilterChangeHandler(this.handleRangeFilterChange);

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
    this.filtersComponent.setCheckboxFilterChangeHandler(this.handleCheckboxFilterChange);
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

  handleProductsModelEvent(updateType) {
    if (updateType === UpdateType.INIT) {
      this.renderRangeFilter();
    }
  }

  handleFavoritesModelEvent() {
    this.disabled = this.favoritesModel.getShowFavorites() === true;
    this.rangeFilterComponent.setDisabled(this.disabled);
    this.renderCategoryFilters();
    this.renderFilterShowButton();
  }

  handleCategoryModelEvent() {
    this.selectedCategory = this.categoryModel.getCategory();
    this.resetFilters();
    this.renderRangeFilter();
    this.renderCategoryFilters();
  }

  resetFilters() {
    this.selectedFilters = {};
    this.filterModel.setFilters(UpdateType.MAJOR, this.selectedFilters);
  }

  handleCheckboxFilterChange(name, value, checked) {
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

  handleRangeFilterChange(values) {
    const [minPrice, maxPrice] = values.split(`,`);
    this.selectedFilters.minPrice = Number(minPrice);
    this.selectedFilters.maxPrice = Number(maxPrice);
  }

  handleFilterChange(name, value) {
    this.selectedFilters[name] = value;
  }

  handleShowButtonClick() {
    this.filterModel.setFilters(UpdateType.MAJOR, this.selectedFilters);
  }
}
