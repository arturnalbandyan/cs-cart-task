const useCheckedValues = (object) => {
  return Object.values(object).filter((value) => value === true);
};

export default useCheckedValues;
