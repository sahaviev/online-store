import { CategoryType } from '../const';

export const adaptDate = (date) => {
  const dateChunks = date.split('.');
  const dateObject = new Date();
  dateObject.setDate(dateChunks[0]);
  dateObject.setMonth(dateChunks[1] - 1);
  dateObject.setFullYear(dateChunks[2]);
  return dateObject;
};

const serverCategoryAdaptor = {
  'Недвижимость': CategoryType.ESTATE,
  'Ноутбук': CategoryType.LAPTOPS,
  'Фотоаппарат': CategoryType.CAMERA,
  'Автомобиль': CategoryType.CARS,
};

const serverEstateTypeAdaptor = {
  'Квартира': 'flat',
  'Дом': 'house',
  'Апартаменты': 'apartments',
};

const serverNotebookTypeAdaptor = {
  'Домашний': 'home',
  'Ультрабук': 'ultra',
  'Игровой': 'gaming',
};

export const adaptEstateType = (type) => serverEstateTypeAdaptor[type];
export const adaptNotebookType = (type) => serverNotebookTypeAdaptor[type];
export const adaptCategory = (category) => serverCategoryAdaptor[category];
