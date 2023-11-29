import { useEffect, useState } from "react";
import useCamelCase from "./useCamelCase";

const useFetchFilters = (url) => {
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch(url)
          .then((res) => res.json())
          .then((data) => setFilters(data));
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchData();
  }, [url]);

  return useCamelCase(filters);
};

export default useFetchFilters;
