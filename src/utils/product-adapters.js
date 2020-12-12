import { CategoryType } from '../const';

const MILLISECONDS = 1000;
const ONE_YEAR_DAYS = 365;
const ONE_DAY = 1;
const ONE_MONTH_DAYS = 30;
const ONE_DAY_HOURS = 24;
const ONE_DAY_MILLISECONDS = 86400 * MILLISECONDS;

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

export const adaptDate = (timestamp) => new Date(timestamp * MILLISECONDS);

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

const serverCategories = {
  Недвижимость: CategoryType.ESTATE,
  Ноутбук: CategoryType.LAPTOPS,
  Фотоаппарат: CategoryType.CAMERA,
  Автомобиль: CategoryType.CARS,
};

const paramsLabels = {
  [CategoryType.ESTATE]: {
    type: 'Тип недвижимости',
    area: 'Площадь, м2',
    'rooms-count': 'Количество комнат',
  },
  [CategoryType.LAPTOPS]: {
    type: 'Тип ноутбука',
    'ram-value': 'Объем оперативной памяти',
    'screen-size': 'Диагональ экрана',
    'cpu-type': 'Тип процессора',
  },
  [CategoryType.CAMERA]: {
    type: 'Тип фотоаппарата',
    'matrix-resolution': 'Разрешение матрицы',
    supporting: 'Разрешение видео',
  },
  [CategoryType.CARS]: {
    'body-type': 'Тип кузова',
    transmission: 'Коробка передач',
    'production-year': 'Год выпуска',
  },
};

export const adaptCategory = (category) => serverCategories[category];

// eslint-disable-next-line max-len
export const adaptParamsLabels = (category, type) => paramsLabels[category][type];
