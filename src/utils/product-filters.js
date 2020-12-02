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

function filterCameras(products, filters) {
  return products.filter((product) => {
    if (product.category !== CategoryType.CAMERA) {
      return false;
    }

    const additional = product['additional-information'];

    if (!additional || !additional.notebook) {
      return false;
    }

    // ToDo: переделать сервер на нормальную структуру
    const camera = additional.notebook;

    const cameraType = filters['camera-type'];
    if (cameraType && cameraType.length > 0 && !cameraType.includes(adaptCameraType(camera.type))) {
      return false;
    }

    const matrixResolution = filters['resolution-matrix'];
    if (matrixResolution && matrixResolution !== 'any' && Number(matrixResolution) < Math.floor(camera['matrix-resolution'])) {
      return false;
    }

    const videoResolution = filters['resolution-video'];
    if (videoResolution && videoResolution !== 'any' && videoResolution !== camera.supported) {
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

    if (!additional || !additional.car) {
      return false;
    }

    const { car } = additional;

    const carYear = filters['car-year'];
    if (carYear && carYear !== 'any' && Number(carYear) > Number(car['production-year'])) {
      return false;
    }

    const gearboxType = filters.gearbox;
    if (gearboxType && gearboxType !== 'any' && gearboxType !== adaptGearboxType(car.gearbox)) {
      return false;
    }

    const carcass = filters['body-type'];
    if (carcass && carcass.length > 0 && !carcass.includes(adaptCarcassType(car.carcass))) {
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
