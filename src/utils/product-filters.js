import { CategoryType } from '../const';
import {
  adaptEstateType, adaptNotebookType, adaptCameraType, adaptCarcassType, adaptGearboxType,
} from './product-adapters';

function filterEstates(products, filters) {
  return products.filter((product) => {
    if (product.category !== CategoryType.ESTATE) {
      return false;
    }

    const additional = product['additional-information'];

    if (!additional) {
      return false;
    }

    if (filters['estate-type'] && filters['estate-type'].length > 0 && !filters['estate-type'].includes(adaptEstateType(additional.type))) {
      return false;
    }

    if (filters['min-square'] && Number(filters['min-square']) > additional.area) {
      return false;
    }

    if (filters.rooms && filters.rooms !== 'any') {
      const exactCount = Number(filters.rooms) !== additional['number-of-rooms'];
      const fiveAndMore = filters.rooms === 'five_and_more' && additional['number-of-rooms'] < 5;
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

    if (!additional) {
      return false;
    }

    const laptopType = filters['laptop-type'];
    // eslint-disable-next-line max-len
    if (laptopType && laptopType.length > 0 && !laptopType.includes(adaptNotebookType(additional.type))) {
      return false;
    }

    const { ram } = filters;
    if (ram && ram !== 'any' && Number(ram) !== additional['amount-of-RAM']) {
      return false;
    }

    const screenDiagonal = filters.diagonal;
    if (screenDiagonal && screenDiagonal !== 'any' && Number(screenDiagonal) !== Math.floor(additional['screen-diagonal'])) {
      return false;
    }

    const laptopProcessor = filters['laptop-processor'];
    if (laptopProcessor && laptopProcessor.length > 0 && !laptopProcessor.includes(additional['processor-type'])) {
      return false;
    }

    return true;
  });
}

function filterCameras(products, filters) {
  return products.filter((product) => {
    if (product.category !== CategoryType.CAMERA) {
      return false;
    }

    const additional = product['additional-information'];

    if (!additional) {
      return false;
    }

    const cameraType = filters['camera-type'];
    if (cameraType && cameraType.length > 0 && !cameraType.includes(adaptCameraType(additional.type))) {
      return false;
    }

    const matrixResolution = filters['resolution-matrix'];
    if (matrixResolution && matrixResolution !== 'any' && Number(matrixResolution) < Math.floor(additional['matrix-resolution'])) {
      return false;
    }

    const videoResolution = filters['resolution-video'];
    if (videoResolution && videoResolution !== 'any' && videoResolution !== additional.supported) {
      return false;
    }

    return true;
  });
}

function filterCars(products, filters) {
  return products.filter((product) => {
    if (product.category !== CategoryType.CARS) {
      return false;
    }

    const additional = product['additional-information'];

    if (!additional) {
      return false;
    }

    const carYear = filters['car-year'];
    if (carYear && carYear !== 'any' && Number(carYear) > Number(additional['production-year'])) {
      return false;
    }

    const gearboxType = filters.gearbox;
    if (gearboxType && gearboxType !== 'any' && gearboxType !== adaptGearboxType(additional.gearbox)) {
      return false;
    }

    const bodyType = filters['body-type'];
    if (bodyType && bodyType.length > 0 && !bodyType.includes(adaptCarcassType(additional.carcass))) {
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
      return filterCameras(products, filters);
    case CategoryType.CARS:
      return filterCars(products, filters);
    default:
      return products;
  }
};
