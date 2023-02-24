const isoDate = str => {
  const reg = /^\d{4}-\d{2}-\d{2}$/;
  return reg.test(str);
};

export default isoDate;
