import { CategoryType } from '../const';

function filterEstates(products, filters) {
  return products.filter((product) => {
    if (product.category !== CategoryType.ESTATE) {
      return false;
    }

    const params = product.filters;

    if (!params) {
      return false;
    }

    if (filters['estate-type'] && filters['estate-type'].length > 0 && !filters['estate-type'].includes(params.type)) {
      return false;
    }

    if (filters['min-square'] && Number(filters['min-square']) > params.area) {
      return false;
    }

    if (filters.rooms && filters.rooms !== 'any') {
      const exactCount = Number(filters.rooms) !== params['rooms-count'];
      const fiveAndMore = filters.rooms === 'five_and_more' && params['rooms-count'] < 5;
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

    const params = product.filters;

    if (!params) {
      return false;
    }

    const laptopType = filters['laptop-type'];
    // eslint-disable-next-line max-len
    if (laptopType && laptopType.length > 0 && !laptopType.includes(params.type)) {
      return false;
    }

    if (filters.ram && filters.ram !== 'any' && Number(filters.ram) !== params['ram-value']) {
      return false;
    }

    const screenSize = filters.diagonal;
    if (screenSize && screenSize !== 'any' && Number(screenSize) !== Math.floor(params['screen-size'])) {
      return false;
    }

    const cpuType = filters['laptop-processor'];
    if (cpuType && cpuType.length > 0 && !cpuType.includes(params['cpu-type'])) {
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

    const params = product.filters;

    if (!params) {
      return false;
    }

    const cameraType = filters['camera-type'];
    if (cameraType && cameraType.length > 0 && !cameraType.includes(params.type)) {
      return false;
    }

    const matrixResolution = filters['resolution-matrix'];
    if (matrixResolution && matrixResolution !== 'any' && Number(matrixResolution) < Math.floor(params['matrix-resolution'])) {
      return false;
    }

    const videoResolution = filters['resolution-video'];
    if (videoResolution && videoResolution !== 'any' && videoResolution !== params.supporting.toLowerCase()) {
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

    const params = product.filters;

    if (!params) {
      return false;
    }

    const productionYear = filters['production-year'];
    if (productionYear && productionYear !== 'any' && Number(productionYear) > Number(params['production-year'])) {
      return false;
    }

    const { transmission } = filters;
    if (transmission && transmission !== 'any' && transmission !== params.transmission) {
      return false;
    }

    const bodyType = filters['body-type'];
    if (bodyType && bodyType.length > 0 && !bodyType.includes(params['body-type'])) {
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
