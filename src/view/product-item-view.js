import {AbstractView} from './abstract-view.js';
import {preload} from '../utils/image.js';

const NAVIGATION_PHOTOS_COUNT = 5;

const createProductItemTemplate = (product) => `<li class="results__item product">
    <button class="product__favourite fav-add ${product.isFavorite && `fav-add--checked`}" type="button" aria-label="Добавить в избранное" id="add-to-favorite">
      <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="product__image">
        <div class="product__image-navigation">
        ${product.photos.slice(0, NAVIGATION_PHOTOS_COUNT).map((photo, index) => `<div class="product__navigation-column" data-photo-index="${index}">
            <span></span>
        </div>`).join(``)}
      </div><div class="product__image-more-photo hidden"></div>
      <img src="${product.photos[0]}" srcset="${product.photos[0]} 2x" alt="${product.name}" />
    </div>
    <div class="product__content">
      <h3 class="product__title">
        <a href="#" class="product__name">${product.name}</a>
      </h3>
      <div class="product__price">${product[`formatted-price`]} ₽</div>
      <div class="product__address">${product.address.city}, ${product.address.street}</div>
      <span class="product__date" title="${product.dateString}">${product.dateDifference}</span>
    </div>
  </li>`;

export class ProductItemView extends AbstractView {
  constructor(product) {
    super();
    this.product = product;

    this.hideMorePhotos = this.hideMorePhotos.bind(this);
    this.favoriteClickHandler = this.favoriteClickHandler.bind(this);
    this.productOpenClickHandler = this.productOpenClickHandler.bind(this);
    this.previewPhotoMouseOverHandler = this.previewPhotoMouseOverHandler.bind(this);

    this.navigationElement = this.getElement().querySelector(`.product__image-navigation`);
    this.morePhotoElement = this.getElement().querySelector(`.product__image-more-photo`);

    this.navigationElement.addEventListener(`mouseover`, this.previewPhotoMouseOverHandler);
  }

  getTemplate() {
    return createProductItemTemplate(this.product);
  }

  showMorePhotos() {
    const photosCount = this.product.photos.length;
    if (photosCount > NAVIGATION_PHOTOS_COUNT) {
      this.morePhotoElement.classList.remove(`hidden`);
      this.morePhotoElement.innerText = `+${photosCount - NAVIGATION_PHOTOS_COUNT} фото`;
    }
  }

  hideMorePhotos() {
    this.morePhotoElement.classList.add(`hidden`);
  }

  setFavoriteClickHandler(callback) {
    this.callbacks.favoriteClick = callback;
    this.getElement().querySelector(`#add-to-favorite`).addEventListener(`click`, this.favoriteClickHandler);
  }

  setProductOpenClickHandler(callback) {
    this.callbacks.productOpenClick = callback;
    this.getElement().querySelector(`.product__name`).addEventListener(`click`, this.productOpenClickHandler);
    this.getElement().querySelector(`.product__image`).addEventListener(`click`, this.productOpenClickHandler);
  }

  previewPhotoMouseOverHandler(evt) {
    const photoIndex = Number(evt.target.dataset.photoIndex);
    const photo = this.product.photos[photoIndex];

    if (photoIndex === (NAVIGATION_PHOTOS_COUNT - 1)) {
      this.showMorePhotos();
      evt.target.addEventListener(`mouseout`, this.hideMorePhotos);
    }

    if (!photo) {
      return;
    }

    const mainImage = this.getElement().querySelector(`.product__image img`);
    preload(photo, () => {
      mainImage.setAttribute(`src`, photo);
      mainImage.setAttribute(`srcset`, photo);
    });
  }

  favoriteClickHandler(evt) {
    evt.preventDefault();
    this.callbacks.favoriteClick();
  }

  productOpenClickHandler(evt) {
    evt.preventDefault();
    this.callbacks.productOpenClick();
  }
}
