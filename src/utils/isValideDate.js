export const isInFuture = date => {
  return Date.parse(date) > Date.now();
};

export const endIsBigger = (start, end) => {
  return end > start;
};

const validDate = (start, end) => {
  if (!isInFuture(start) || !isInFuture(end)) {
    return false;
  }
  if (!endIsBigger(start, end)) {
    return false;
  }
  return true;
};

export default validDate;
