import {CategoryType} from '../const.js';

export const getCategoryProducts = (products, category) => {
  return products.filter((product) => product.category === category);
};

export const getProductsPriceRanges = (products) => {
  const prices = products.map((product) => product.price);

  return {
    min: Math.min.apply(null, prices),
    max: Math.max.apply(null, prices),
  };
};

const checkEstateType = (filters, product) => {
  const estateType = filters[`estate-type`];
  return !estateType || estateType.length === 0 || estateType.length > 0 && estateType.includes(product.filters.type);
};

const checkEstateSquare = (filters, product) => {
  const minSquare = filters[`min-square`];
  return !minSquare || product.filters.area > Number(minSquare);
};

const checkEstateRoomsCount = (filters, product) => {
  const exactCount = Number(filters.rooms) === product.filters[`rooms-count`];
  const fiveAndMore = filters.rooms === `five_and_more` && product.filters[`rooms-count`] >= 5;
  return !filters.rooms || filters.rooms === `any` || exactCount || fiveAndMore;
};

const checkLaptopType = (filters, product) => {
  const laptopType = filters[`laptop-type`];
  return !laptopType || laptopType.length === 0 || laptopType.length > 0 && laptopType.includes(product.filters.type);
};

const checkLaptopRam = (filters, product) => {
  return !filters.ram || filters.ram === `any` || Number(filters.ram) === product.filters[`ram-value`];
};

const checkLaptopScreenSize = (filters, product) => {
  const {diagonal} = filters;
  return !diagonal || diagonal === `any` || Number(diagonal) === Math.floor(product.filters[`screen-size`]);
};

const checkLaptopCpu = (filters, product) => {
  const processor = filters[`laptop-processor`];
  return !processor || processor.length === 0 || processor.length > 0 && processor.includes(product.filters[`cpu-type`]);
};

const checkCameraType = (filters, product) => {
  const cameraType = filters[`camera-type`];
  return !cameraType || cameraType.length === 0 || cameraType.length > 0 && cameraType.includes(product.filters.type);
};

const checkCameraMatrix = (filters, product) => {
  const matrixResolution = filters[`resolution-matrix`];
  return !matrixResolution || matrixResolution === `any` || Math.floor(product.filters[`matrix-resolution`]) >= Number(matrixResolution);
};

const checkCameraVideo = (filters, product) => {
  const videoResolution = filters[`resolution-video`];
  return !videoResolution || videoResolution === `any` || videoResolution === product.filters.supporting.toLowerCase();
};

const checkCarProductionYear = (filters, product) => {
  const productionYear = filters[`production-year`];
  return !productionYear || productionYear === `any` || Number(product.filters[`production-year`]) >= Number(productionYear);
};

const checkCarTransmission = (filters, product) => {
  const {transmission} = filters;
  return !transmission || transmission === `any` || transmission === product.filters.transmission;
};

const checkCarBodyType = (filters, product) => {
  const bodyType = filters[`body-type`];
  return !bodyType || bodyType.length > 0 && bodyType.includes(product.filters[`body-type`]);
};


const checkCategory = (category, product) => {
  return category === CategoryType.ALL || product.category === category;
};

const checkPrice = (filters, product) => (
  (!filters.minPrice || product.price >= filters.minPrice) &&
  (!filters.maxPrice || product.price <= filters.maxPrice)
);

export const filterProducts = (products, category, filters) => products.filter((product) => {
  if (!(product.filters && checkCategory(category, product) && checkPrice(filters, product))) {
    return false;
  }

  switch (category) {
    case CategoryType.ESTATE:
      return (
        checkEstateType(filters, product) &&
        checkEstateSquare(filters, product) &&
        checkEstateRoomsCount(filters, product)
      );
    case CategoryType.LAPTOPS:
      return (
        checkLaptopType(filters, product) &&
        checkLaptopRam(filters, product) &&
        checkLaptopScreenSize(filters, product) &&
        checkLaptopCpu(filters, product)
      );
    case CategoryType.CAMERA:
      return (
        checkCameraType(filters, product) &&
        checkCameraMatrix(filters, product) &&
        checkCameraVideo(filters, product)
      );
    case CategoryType.CARS:
      return (
        checkCarProductionYear(filters, product) &&
        checkCarTransmission(filters, product) &&
        checkCarBodyType(filters, product)
      );
    default:
      return true;
  }
});
