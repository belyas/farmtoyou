const hasEmptyValue = array => {
  const result = array.findIndex(item => item === '' || item === undefined);
  console.log('result', result);
  return result !== -1;
};

export default hasEmptyValue;
