export const dateGoodLooking = (date) => {
  if (date < 10) {
    date = `0` + date;
  }

  return date;
};
