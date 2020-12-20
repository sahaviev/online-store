import { CategoryType } from '../const';

const MILLISECONDS = 1000;
const ONE_DAY = 1;
const ONE_WEEK_DAYS = 7;
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

export const adaptDate = (timestamp) => new Date(Number(timestamp));

export const formatPrice = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '&thinsp;');

export const getPublishDateDifference = (date) => {
  const currentDate = new Date();
  const differenceDays = (currentDate - date) / ONE_DAY_MILLISECONDS;

  if (date.getFullYear() !== currentDate.getFullYear()) {
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} года`;
  }

  if (differenceDays > ONE_WEEK_DAYS) {
    return `${date.getDate()} ${months[date.getMonth()]}`;
  }

  if (differenceDays > ONE_DAY && differenceDays <= ONE_WEEK_DAYS) {
    return `${Math.floor(differenceDays)} дней назад `;
  }

  return `${Math.round(differenceDays * ONE_DAY_HOURS)} час(ов) назад`;
};

const serverCategories = {
  Недвижимость: CategoryType.ESTATE,
  Ноутбук: CategoryType.LAPTOPS,
  Фотоаппарат: CategoryType.CAMERA,
  Автомобиль: CategoryType.CARS,
};

const filtersNames = {
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

const filtersValues = {
  [CategoryType.ESTATE]: {
    flat: 'Квартира',
    house: 'Дом',
    apartments: 'Аппартаменты',
  },
  [CategoryType.LAPTOPS]: {
    i3: 'Intel Core i3',
    i5: 'Intel Core i5',
    i7: 'Intel Core i7',
    4: '4 Гб',
    8: '8 Гб',
    16: '16 Гб',
    ultra: 'Ультрабук',
    home: 'Домашний ноутбук',
    gaming: 'Игровой ноутбук',
  },
  [CategoryType.CAMERA]: {
    slr: 'Зеркальный',
    digital: 'Цифровой',
    mirrorless: 'Беззеркальный',
    hd: 'HD',
    'full-hd': 'Full HD',
    '4k': '4K',
    '5k': '5K',
  },
  [CategoryType.CARS]: {
    auto: 'Автомат',
    mechanic: 'Механическая',
    sedan: 'Седан',
    universal: 'Универсал',
    hatchback: 'Хэтчбэк',
    suv: 'Внедорожник',
    coupe: 'Купэ',
  },
};

export const adaptCategory = (category) => serverCategories[category];

// eslint-disable-next-line max-len
export const adaptFilterName = (category, filter) => filtersNames[category][filter];
// eslint-disable-next-line max-len
export const adaptFilterValue = (category, value) => (filtersValues[category][value] ? filtersValues[category][value] : value);
