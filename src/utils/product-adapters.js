import { CategoryType } from '../const';

export const adaptDate = (date) => {
  const dateChunks = date.split('.');
  const dateObject = new Date();
  dateObject.setDate(dateChunks[0]);
  dateObject.setMonth(dateChunks[1] - 1);
  dateObject.setFullYear(dateChunks[2]);
  return dateObject;
};

const serverCategoriesAdaptor = {
  'Недвижимость': CategoryType.ESTATE,
  'Ноутбук': CategoryType.LAPTOPS,
  'Фотоаппарат': CategoryType.CAMERA,
  'Автомобиль': CategoryType.CARS,
};

const serverEstateTypesAdaptor = {
  'Квартира': 'flat',
  'Дом': 'house',
  'Апартаменты': 'apartments',
};

const serverNotebookTypesAdaptor = {
  'Домашний': 'home',
  'Ультрабук': 'ultra',
  'Игровой': 'gaming',
};

const serverCameraTypesAdaptor = {
  'Цифровой': 'digital',
  'Зеркальный': 'mirror',
  'Беззеркальный': 'mirrorless',
};

const serverCarcassTypesAdaptor = {
  'Седан': 'sedan',
  'Хэтчбек': 'hatchback',
  'Внедорожник': 'suv',
  'Универсал': 'universal',
  'Купе': 'coupe',
};

const serverGearboxTypesAdaptor = {
  'Автомат': 'auto',
  'Механическая коробка передач': 'mechanic',
};

export const adaptCategory = (category) => serverCategoriesAdaptor[category];

export const adaptEstateType = (type) => serverEstateTypesAdaptor[type];
export const adaptNotebookType = (type) => serverNotebookTypesAdaptor[type];
export const adaptCameraType = (type) => serverCameraTypesAdaptor[type];
export const adaptCarcassType = (type) => serverCarcassTypesAdaptor[type];
export const adaptGearboxType = (type) => serverGearboxTypesAdaptor[type];
