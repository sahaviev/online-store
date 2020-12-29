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

const checkEstateType = (estateTypeFilter, productType) =>
  !estateTypeFilter || estateTypeFilter.length === 0 || estateTypeFilter.length > 0 && estateTypeFilter.includes(productType);

const checkEstateSquare = (minSquareFilter, productArea) => !minSquareFilter || productArea > Number(minSquareFilter);

const checkEstateRoomsCount = (roomsFilter, productRoomsCount) => {
  const exactCount = Number(roomsFilter) === productRoomsCount;
  const fiveAndMore = roomsFilter === `five_and_more` && productRoomsCount >= 5;
  return !roomsFilter || roomsFilter === `any` || exactCount || fiveAndMore;
};

const checkLaptopType = (laptopType, productType) =>
  !laptopType || laptopType.length === 0 || laptopType.length > 0 && laptopType.includes(productType);

const checkLaptopRam = (ram, productRam) => {
  return !ram || ram === `any` || Number(ram) === productRam;
};

const checkLaptopScreenSize = (diagonal, productScreenSize) => {
  return !diagonal || diagonal === `any` || Number(diagonal) === Math.floor(productScreenSize);
};

const checkLaptopCpu = (processor, productCpu) => {
  return !processor || processor.length === 0 || processor.length > 0 && processor.includes(productCpu);
};

const checkCameraType = (cameraType, productType) => {
  return !cameraType || cameraType.length === 0 || cameraType.length > 0 && cameraType.includes(productType);
};

const checkCameraMatrix = (matrixResolution, productMatrix) => {
  return !matrixResolution || matrixResolution === `any` || Math.floor(productMatrix) >= Number(matrixResolution);
};

const checkCameraVideo = (videoResolution, productVideoSupporting) => {
  return !videoResolution || videoResolution === `any` || videoResolution === productVideoSupporting.toLowerCase();
};

const checkCarProductionYear = (productionYear, productProductionYear) => {
  return !productionYear || productionYear === `any` || Number(productProductionYear) >= Number(productionYear);
};

const checkCarTransmission = (transmission, productTransmission) => {
  return !transmission || transmission === `any` || transmission === productTransmission;
};

const checkCarBodyType = (bodyType, productBodyType) => {
  return !bodyType || bodyType.length > 0 && bodyType.includes(productBodyType);
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
        checkEstateType(filters[`estate-type`], product.filters.type) &&
        checkEstateSquare(filters[`min-square`], product.filters.area) &&
        checkEstateRoomsCount(filters.rooms, product.filters[`rooms-count`])
      );
    case CategoryType.LAPTOPS:
      return (
        checkLaptopType(filters[`laptop-type`], product.filters.type) &&
        checkLaptopRam(filters.ram, product.filters[`ram-value`]) &&
        checkLaptopScreenSize(filters.diagonal, product.filters[`screen-size`]) &&
        checkLaptopCpu(filters[`laptop-processor`], product.filters[`cpu-type`])
      );
    case CategoryType.CAMERA:
      return (
        checkCameraType(filters[`camera-type`], product.filters.type) &&
        checkCameraMatrix(filters[`resolution-matrix`], product.filters[`matrix-resolution`]) &&
        checkCameraVideo(filters[`resolution-video`], product.filters.supporting)
      );
    case CategoryType.CARS:
      return (
        checkCarProductionYear(filters[`production-year`], product.filters[`production-year`]) &&
        checkCarTransmission(filters.transmission, product.filters.transmission) &&
        checkCarBodyType(filters[`body-type`], product.filters[`body-type`])
      );
    default:
      return true;
  }
});
