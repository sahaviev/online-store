export const sortByPrice = (product1, product2) => product1.price - product2.price;

export const sortByDate = (product1, product2) => product2.date - product1.date;

export const adaptDate = (date) => {
  const dateChunks = date.split('.');
  const dateObject = new Date();
  dateObject.setDate(dateChunks[0]);
  dateObject.setMonth(dateChunks[1] - 1);
  dateObject.setFullYear(dateChunks[2]);
  return dateObject;
};
