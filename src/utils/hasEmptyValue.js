const hasEmptyValue = array => {
  const result = array.findIndex(item => item === undefined || item === '' || item === null);
  return result !== -1;
};

export default hasEmptyValue;
