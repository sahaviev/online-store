import {convertStringTimestampToDate, getPublishDateDifference, getPublishDateString} from '../utils/date.js';

describe(`Check convertStringTimestampToDate working`, () => {
  test(`convertStringTimestampToDate("1576773899132") has toBe javascript date`, () => {
    const timestamp = `1576773899132`;
    const date = new Date(Number(timestamp));
    expect(convertStringTimestampToDate(timestamp).getTime()).toBe(date.getTime());
  });
});

describe(`Check getPublishDateDifference working`, () => {
  test(`getPublishDateDifference(false) has toBe null`, () => {
    expect(getPublishDateDifference(false)).toBe(null);
  });

  test(`getPublishDateDifference(date) has toBe '19 декабря 2019 года'`, () => {
    const date = new Date(1576773899132);
    expect(getPublishDateDifference(date)).toBe(`19 декабря 2019 года`);
  });

  test(`getPublishDateDifference(date) has toBe '19 декабря'`, () => {
    const date = new Date(1608357899132);
    expect(getPublishDateDifference(date)).toBe(`19 декабря`);
  });


  test(`getPublishDateDifference(date) has toBe '23 час(ов) назад'`, () => {
    const date = new Date(1608945899132);
    expect(getPublishDateDifference(date)).toBe(`23 час(ов) назад`);
  });


  test(`getPublishDateDifference(date) has toBe '2 дня назад'`, () => {
    const date = new Date(1608777899132);
    expect(getPublishDateDifference(date)).toBe(`2 дня назад`);
  });
});

describe(`Check getPublishDateString working`, () => {
  test(`getPublishDateString(date) has toBe '19 декабря 2019'`, () => {
    const date = new Date(1576773899132);
    expect(getPublishDateString(date)).toBe(`19 декабря 2019`);
  });
});
