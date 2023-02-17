const hasEmptyValue = array => {
  const result = array.findIndex(item => !item);
  return result !== -1;
};

export default hasEmptyValue;
