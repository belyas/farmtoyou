export const isInFuture = date => {
  return Date.parse(date) > Date.now();
};

export const endIsBigger = (start, end) => {
  return end > start;
};

const validDate = (start, end) => {
  if (!isInFuture(start) || !isInFuture(end)) {
    return { valid: false, message: 'Subscription start and end dates must be in future.' };
  }
  if (!endIsBigger(start, end)) {
    return { valid: false, message: 'Subscription end date must be after start date.' };
  }
  return { valid: true };
};

export default validDate;
