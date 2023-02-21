export const redirect = ({ timer = 200, to = '/' } = {}) => {
  setTimeout(() => (window.location.href = to), timer);
};
