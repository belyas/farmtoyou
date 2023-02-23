const arrayFormatRe = /{[a-zA-Z]*}/;

//Question how to modify regexp to also make sure within {} there is value?
const correctDBArray = string => {
  const result = string.match(arrayFormatRe);

  if (!result) {
    return false;
  } else {
    return true;
  }
};

export default correctDBArray;
