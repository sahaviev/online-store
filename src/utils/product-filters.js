import { CategoryType } from '../const';
import { adaptEstateType, adaptNotebookType } from './product-adapters';

function filterEstates(products, filters) {
  return products.filter((product) => {
    if (product.category !== CategoryType.ESTATE) {
      return false;
    }

    const additional = product['additional-information'];

    if (!additional || !additional.immovables) {
      return false;
    }

    const { immovables } = additional;

    if (filters['estate-type'] && filters['estate-type'].length > 0 && !filters['estate-type'].includes(adaptEstateType(immovables.type))) {
      return false;
    }

    if (filters['min-square'] && Number(filters['min-square']) > immovables.area) {
      return false;
    }

    if (filters.rooms && filters.rooms !== 'any') {
      const exactCount = Number(filters.rooms) !== immovables['number-of-rooms'];
      const fiveAndMore = filters.rooms === 'five_and_more' && immovables['number-of-rooms'] < 5;
      if (exactCount || fiveAndMore) {
        return false;
      }
    }

    return true;
  });
}

function filterLaptops(products, filters) {
  return products.filter((product) => {
    if (product.category !== CategoryType.LAPTOPS) {
      return false;
    }

    const additional = product['additional-information'];

    if (!additional || !additional.notebook) {
      return false;
    }

    const { notebook } = additional;

    const laptopType = filters['laptop-type'];
    // eslint-disable-next-line max-len
    if (laptopType && laptopType.length > 0 && !laptopType.includes(adaptNotebookType(notebook.type))) {
      return false;
    }

    const { ram } = filters;
    if (ram && ram !== 'any' && Number(ram) !== notebook['amount-of-RAM']) {
      return false;
    }

    const screenDiagonal = filters.diagonal;
    if (screenDiagonal && screenDiagonal !== 'any' && Number(screenDiagonal) !== Math.floor(notebook['screen-diagonal'])) {
      return false;
    }

    const laptopProcessor = filters['laptop-processor'];
    if (laptopProcessor && laptopProcessor.length > 0 && !laptopProcessor.includes(notebook['processor-type'])) {
      return false;
    }

    return true;
  });
}

export const filterProducts = (products, category, filters) => {
  switch (category) {
    case CategoryType.ALL:
      return products;
    case CategoryType.ESTATE:
      return filterEstates(products, filters);
    case CategoryType.LAPTOPS:
      return filterLaptops(products, filters);
    case CategoryType.CAMERA:
      return products;
    case CategoryType.CARS:
      return products;
    default:
      return products;
  }
};
