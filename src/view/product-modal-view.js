import { AbstractView } from './abstract-view.js';
import { adaptAdditionalInformation, getPublishDateDifference } from '../utils/product-adapters';
import { preload } from '../utils/image';
import { initMap, addMarker } from '../utils/leaftlet';

/* ToDo: сделать отображение активной превью фотки по умолчанию ${index === 0 && 'gallery__item--active'} */
const createProductModalTemplate = (product) => `<section class="popup">
        <div class="popup__inner">
          <button class="popup__close" type="button" aria-label="Закрыть">
            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292893 15.7071C-0.0976311 15.3166 -0.0976311 14.6834 0.292893 14.2929L6.58579 8L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893Z"/>
            </svg>
          </button>
          <div class="popup__date">${getPublishDateDifference(product.date)}</div>
          <h3 class="popup__title">${product.name}</h3>
          <div class="popup__price">${product['formatted-price']} ₽</div>
          <div class="popup__columns">
            <div class="popup__left">
              <div class="popup__gallery gallery">
                <button class="gallery__favourite fav-add ${product.is_favorite && 'fav-add--checked'}" id="add-to-favorite">
                  <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div class="gallery__main-pic">
                  <img src="${product.photos[0]}" srcset="${product.photos[0]}" width="520" height="340" alt="${product.name} - основное фото">
                </div>
                <ul class="gallery__list">
                    ${product.photos.map((photo, index) => `<li class="gallery__item">
                      <img src="${photo}" srcset="${photo}" alt="${index}" width="124" height="80" data-photo-index="${index}" />
                    </li>`).join('')}
                </ul>
              </div>
              <ul class="popup__chars chars">
                ${Object.keys(product.filters).map((key) => `<li class="chars__item">
                  <div class="chars__name">${adaptAdditionalInformation(product.category, key)}</div>
                  <div class="chars__value">${product.filters[key]}</div>
                </li>`).join('')}
              </ul>
              <div class="popup__seller seller seller--good">
                <h3>Продавец</h3>
                <div class="seller__inner">
                  <a class="seller__name" href="#">${product.seller.fullname}</a>
                  <div class="seller__rating"><span>${product.seller.rating}</span></div>
                </div>
              </div>
              <div class="popup__description">
                <h3>Описание товара</h3>
                <p>${product.description}</p>
              </div>
            </div>
            <div class="popup__right">
              <div class="popup__map" id="map"></div>
              <div class="popup__address">${product.address}</div>
            </div>
          </div>
        </div>
      </section>`;

export class ProductModalView extends AbstractView {
  constructor(product) {
    super();
    this.product = product;

    this.currentActivePreview = null;

    this.renderMap = this.renderMap.bind(this);
    this.favoriteClickHandler = this.favoriteClickHandler.bind(this);
    this.modalOutsideClickHandler = this.modalOutsideClickHandler.bind(this);
    this.documentKeypressHandler = this.documentKeypressHandler.bind(this);
    this.closeModalClickHandler = this.closeModalClickHandler.bind(this);
    this.changeMainPhotoHandler = this.changeMainPhotoHandler.bind(this);

    this.setAfterRenderHandler(this.renderMap);

    this.getElement().querySelector('.gallery__list').addEventListener('click', this.changeMainPhotoHandler);
  }

  renderMap() {
    initMap(
      this.getElement().querySelector('#map'), this.product.coordinates,
    );

    addMarker(this.product.coordinates);
  }

  changeMainPhotoHandler(evt) {
    if (this.currentActivePreview) {
      this.currentActivePreview.classList.remove('gallery__item--active');
    }
    evt.target.parentNode.classList.add('gallery__item--active');
    this.currentActivePreview = evt.target.parentNode;

    const { photoIndex } = evt.target.dataset;
    const photo = this.product.photos[photoIndex];

    if (!photo) {
      return;
    }

    const mainImage = this.getElement().querySelector('.gallery__main-pic img');
    preload(photo, () => {
      mainImage.setAttribute('src', photo);
      mainImage.setAttribute('srcset', photo);
    });
  }

  getTemplate() {
    return createProductModalTemplate(this.product);
  }

  favoriteClickHandler(evt) {
    evt.preventDefault();
    const { classList } = evt.currentTarget;
    if (classList.contains('fav-add--checked')) {
      classList.remove('fav-add--checked');
    } else {
      classList.add('fav-add--checked');
    }
    this.callbacks.favoriteClick();
  }

  closeModalClickHandler(evt) {
    evt.preventDefault();
    this.closeModal();
  }

  documentKeypressHandler(evt) {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      this.closeModal();
    }
  }

  modalOutsideClickHandler(evt) {
    evt.preventDefault();
    if (this.getElement() !== evt.target) {
      return;
    }
    this.closeModal();
  }

  closeModal() {
    document.removeEventListener('keyup', this.documentKeypressHandler);
    this.getElement().removeEventListener('click', this.modalOutsideClickHandler);
    this.getElement().querySelector('.popup__close').removeEventListener('click', this.closeModalClickHandler);
    this.callbacks.closeModalClick();
  }

  setCloseModalClickHandler(callback) {
    this.callbacks.closeModalClick = callback;
    document.addEventListener('keyup', this.documentKeypressHandler);
    this.getElement().addEventListener('click', this.modalOutsideClickHandler);
    this.getElement().querySelector('.popup__close').addEventListener('click', this.closeModalClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this.callbacks.favoriteClick = callback;
    this.getElement().querySelector('#add-to-favorite').addEventListener('click', this.favoriteClickHandler);
  }
}
