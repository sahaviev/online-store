import {
  render, remove, replace, RenderPosition,
} from '../utils/render';
import { UpdateType } from '../const';

import { ProductItemView } from '../view/product-item-view';
import { ProductModalView } from '../view/product-modal-view';

export class ProductItemPresenter {
  constructor(appContainer, productsListContainer, productModel) {
    this.appContainer = appContainer;
    this.productsListContainer = productsListContainer;
    this.productModel = productModel;
    this.productItemComponent = null;
    this.productModalComponent = null;

    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleProductModalOpenClick = this.handleProductModalOpenClick.bind(this);
    this.handleCloseModalClick = this.handleCloseModalClick.bind(this);
  }

  init(product) {
    this.product = product;

    const previous = this.productItemComponent;
    this.productItemComponent = new ProductItemView(product);
    this.productItemComponent.setFavoriteClickHandler(this.handleFavoriteClick);
    this.productItemComponent.setProductOpenClickHandler(this.handleProductModalOpenClick);

    if (previous === null) {
      render(this.productsListContainer, this.productItemComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.productItemComponent, previous);
    remove(previous);
  }

  destroy() {
    this.closeModal();
    remove(this.productItemComponent);
  }

  closeModal() {
    if (this.productModalComponent !== null) {
      remove(this.productModalComponent);
      this.productModalComponent = null;
    }
  }

  handleFavoriteClick() {
    this.productModel.updateProduct(
      UpdateType.MINOR,
      {
        ...this.product,
        is_favorite: !this.product.is_favorite,
      },
    );
  }

  handleCloseModalClick() {
    this.closeModal();
  }

  handleProductModalOpenClick() {
    this.renderProductModal();
  }

  renderProductModal() {
    const previous = this.productModalComponent;

    this.productModalComponent = new ProductModalView(this.product);
    this.productModalComponent.setFavoriteClickHandler(this.handleFavoriteClick);
    this.productModalComponent.setCloseModalClickHandler(this.handleCloseModalClick);

    if (previous === null) {
      render(this.appContainer.parentNode, this.productModalComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.productModalComponent, previous);
    remove(previous);
  }
}
