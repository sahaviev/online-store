
const MILLISECONDS = 1000;
const ONE_DAY = 1;
const ONE_WEEK_DAYS = 7;
const ONE_DAY_HOURS = 24;
const ONE_DAY_SECONDS = 86400;
const ONE_DAY_MILLISECONDS = ONE_DAY_SECONDS * MILLISECONDS;

const months = [
  `января`,
  `февраля`,
  `марта`,
  `апреля`,
  `мая`,
  `июня`,
  `июля`,
  `августа`,
  `сентября`,
  `октября`,
  `ноября`,
  `декабря`,
];

const days = {
  1: `день`,
  2: `дня`,
  3: `дня`,
  4: `дня`,
  5: `дней`,
  6: `дней`,
  7: `дней`,
};

export const convertStringTimestampToDate = (timestamp) => new Date(Number(timestamp));

export const getPublishDateDifference = (date) => {
  if (!(date instanceof Date)) {
    return null;
  }

  const currentDate = new Date();
  const differenceDays = (currentDate - date) / ONE_DAY_MILLISECONDS;

  if (date.getFullYear() !== currentDate.getFullYear()) {
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} года`;
  }

  if (differenceDays > ONE_WEEK_DAYS) {
    return `${date.getDate()} ${months[date.getMonth()]}`;
  }

  if (differenceDays > ONE_DAY && differenceDays <= ONE_WEEK_DAYS) {
    return `${Math.floor(differenceDays)} ${days[Math.round(differenceDays)]} назад`;
  }

  return `${Math.round(differenceDays * ONE_DAY_HOURS)} час(ов) назад`;
};

export const getPublishDateString = (date) => `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
