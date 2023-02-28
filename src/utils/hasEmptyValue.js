const hasEmptyValue = array => {
  const result = array.findIndex(item => item === '' || item === undefined);
  return result !== -1;
};

export default hasEmptyValue;
