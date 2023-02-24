const hasAllFields = (data, fields) => {
  return data.sort().join(',') === fields.sort().join(',');
};

export default hasAllFields;
