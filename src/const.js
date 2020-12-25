export const CategoryType = {
  ALL: `all`,
  ESTATE: `real-estate`,
  LAPTOPS: `laptops`,
  CAMERA: `camera`,
  CARS: `cars`,
};

export const SortingOrder = {
  POPULAR: `popular`,
  CHEAP: `cheap`,
  NEW: `new`,
};

export const categories = [
  {
    name: CategoryType.ALL,
    title: `Все`,
  },
  {
    name: CategoryType.ESTATE,
    title: `Недвижимость`,
  },
  {
    name: CategoryType.LAPTOPS,
    title: `Ноутбуки`,
  },
  {
    name: CategoryType.CAMERA,
    title: `Фотоаппараты`,
  },
  {
    name: CategoryType.CARS,
    title: `Автомобили`,
  },
];

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`,
};
