import { useState, useEffect } from "react";

const deepCamelCaseKeys = (obj) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepCamelCaseKeys);
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) =>
      letter.toUpperCase()
    );
    acc[camelCaseKey] = deepCamelCaseKeys(obj[key]);
    return acc;
  }, {});
};

const useCamelCase = (obj) => {
  const [camelCaseObj, setCamelCaseObj] = useState(deepCamelCaseKeys(obj));

  useEffect(() => {
    setCamelCaseObj(deepCamelCaseKeys(obj));
  }, [obj]);

  return camelCaseObj;
};

export default useCamelCase;
