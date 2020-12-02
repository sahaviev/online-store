import {
  render, remove, replace, RenderPosition,
} from '../utils/render';
import { UpdateType } from '../const';

import { ProductItemView } from '../view/product-item-view';

export class ProductItemPresenter {
  constructor(productsListContainer, productModel) {
    this.productsListContainer = productsListContainer;
    this.productModel = productModel;
    this.productComponent = null;

    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  init(product) {
    this.product = product;

    const previous = this.productComponent;
    this.productComponent = new ProductItemView(product);
    this.productComponent.setFavoriteClickHandler(this.handleFavoriteClick);

    if (previous === null) {
      render(this.productsListContainer, this.productComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.productComponent, previous);
    remove(previous);
  }

  destroy() {
    remove(this.productComponent);
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
}
