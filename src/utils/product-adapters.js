import {CategoryType} from '../const.js';

export const formatPrice = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, `&thinsp;`);

const serverCategories = {
  Недвижимость: CategoryType.ESTATE,
  Ноутбук: CategoryType.LAPTOPS,
  Фотоаппарат: CategoryType.CAMERA,
  Автомобиль: CategoryType.CARS,
};

const filtersNames = {
  [CategoryType.ESTATE]: {
    "type": `Тип недвижимости`,
    "area": `Площадь, м2`,
    'rooms-count': `Количество комнат`,
  },
  [CategoryType.LAPTOPS]: {
    "type": `Тип ноутбука`,
    'ram-value': `Объем оперативной памяти`,
    'screen-size': `Диагональ экрана`,
    'cpu-type': `Тип процессора`,
  },
  [CategoryType.CAMERA]: {
    "type": `Тип фотоаппарата`,
    'matrix-resolution': `Разрешение матрицы`,
    "supporting": `Разрешение видео`,
  },
  [CategoryType.CARS]: {
    'body-type': `Тип кузова`,
    "transmission": `Коробка передач`,
    'production-year': `Год выпуска`,
  },
};

const filtersValues = {
  [CategoryType.ESTATE]: {
    flat: `Квартира`,
    house: `Дом`,
    apartment: `Апартаменты`,
  },
  [CategoryType.LAPTOPS]: {
    i3: `Intel Core i3`,
    i5: `Intel Core i5`,
    i7: `Intel Core i7`,
    4: `4 Гб`,
    8: `8 Гб`,
    16: `16 Гб`,
    ultrabook: `Ультрабук`,
    home: `Домашний ноутбук`,
    gaming: `Игровой ноутбук`,
  },
  [CategoryType.CAMERA]: {
    "slr": `Зеркальный`,
    "digital": `Цифровой`,
    "mirrorless": `Беззеркальный`,
    "hd": `HD`,
    'full-hd': `Full HD`,
    '4k': `4K`,
    '5k': `5K`,
  },
  [CategoryType.CARS]: {
    auto: `Автомат`,
    mechanic: `Механическая`,
    sedan: `Седан`,
    universal: `Универсал`,
    hatchback: `Хэтчбэк`,
    suv: `Внедорожник`,
    coupe: `Купэ`,
  },
};

export const adaptCategory = (category) => serverCategories[category];

// eslint-disable-next-line max-len
export const adaptFilterName = (category, filter) => filtersNames[category][filter];
// eslint-disable-next-line max-len
export const adaptFilterValue = (category, value) => (filtersValues[category][value] ? filtersValues[category][value] : value);
