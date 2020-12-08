import { CategoryType } from '../const';

const DATETIME_PARSE_REGEXP = /(\d*).(\d*).(\d*)\s(\d*):(\d*):(\d*)/is;
const ONE_YEAR_DAYS = 365;
const ONE_DAY = 1;
const ONE_MONTH_DAYS = 30;
const ONE_DAY_HOURS = 24;
const ONE_DAY_MILLISECONDS = 86400000;

const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export const adaptDate = (datetime) => {
  const datetimeChunks = datetime.match(DATETIME_PARSE_REGEXP);
  const dateObject = new Date();
  dateObject.setDate(datetimeChunks[1]);
  dateObject.setMonth(datetimeChunks[2] - 1);
  dateObject.setFullYear(datetimeChunks[3]);
  dateObject.setHours(datetimeChunks[4]);
  dateObject.setMinutes(datetimeChunks[5]);
  dateObject.setSeconds(datetimeChunks[6]);
  return dateObject;
};

export const formatPrice = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '&thinsp;');

export const getPublishDateDifference = (date) => {
  const currentDate = new Date();

  const differenceDays = (currentDate - date) / ONE_DAY_MILLISECONDS;

  if (differenceDays > ONE_YEAR_DAYS) {
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} года`;
  }

  if (differenceDays > ONE_MONTH_DAYS) {
    return `${date.getDate()} дней назад`;
  }

  if (differenceDays > ONE_DAY || differenceDays < ONE_MONTH_DAYS) {
    return `${date.getDate()} ${months[date.getMonth()]}`;
  }

  return `${Math.round(differenceDays * ONE_DAY_HOURS)} часов назад`;
};

const serverCategoriesAdaptor = {
  Недвижимость: CategoryType.ESTATE,
  Ноутбук: CategoryType.LAPTOPS,
  Фотоаппарат: CategoryType.CAMERA,
  Автомобиль: CategoryType.CARS,
};

const serverEstateTypesAdaptor = {
  Квартира: 'flat',
  Дом: 'house',
  Апартаменты: 'apartments',
};

const serverNotebookTypesAdaptor = {
  Домашний: 'home',
  Ультрабук: 'ultra',
  Игровой: 'gaming',
};

const serverCameraTypesAdaptor = {
  Цифровой: 'digital',
  Зеркальный: 'mirror',
  Беззеркальный: 'mirrorless',
};

const serverCarcassTypesAdaptor = {
  Седан: 'sedan',
  Хэтчбек: 'hatchback',
  Внедорожник: 'suv',
  Универсал: 'universal',
  Купе: 'coupe',
};

const serverGearboxTypesAdaptor = {
  Автомат: 'auto',
  'Механическая коробка передач': 'mechanic',
};

export const adaptCategory = (category) => serverCategoriesAdaptor[category];

export const adaptEstateType = (type) => serverEstateTypesAdaptor[type];
export const adaptNotebookType = (type) => serverNotebookTypesAdaptor[type];
export const adaptCameraType = (type) => serverCameraTypesAdaptor[type];
export const adaptCarcassType = (type) => serverCarcassTypesAdaptor[type];
export const adaptGearboxType = (type) => serverGearboxTypesAdaptor[type];
