const numberOnly = (e) => {
  const key = e.key;
  if (key === 'Backspace' || key === 'Delete') return true;
  if (!(parseInt(key) > -1)) e.preventDefault();
  if (key === ' ') e.preventDefault();
  return true;
};

export default numberOnly;
