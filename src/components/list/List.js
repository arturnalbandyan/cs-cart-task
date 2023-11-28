import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

import "./List.module.scss";

const List = ({ data }) => {
  const { displayName, listVariants } = data;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVariants, setFilteredVariants] = useState([]);

  useEffect(() => {
    setFilteredVariants([...listVariants]);
  }, [listVariants]);

  const filterVariants = (input) => {
    const lowercasedInput = input.toLowerCase();
    return listVariants.filter((variant) =>
      variant.displayName.toLowerCase().includes(lowercasedInput)
    );
  };

  const handleSearchInputChange = (brandName) => {
    setSearchTerm(brandName);
    debouncedFilterVariants(brandName);
  };

  const debouncedFilterVariants = useDebounce((brandName) => {
    const filteredVariants = filterVariants(brandName);
    setFilteredVariants(filteredVariants);
  }, 300);

  return (
    <details open>
      <summary>{displayName}</summary>
      <section aria-label="brands-heading">
        <input
          value={searchTerm}
          type="text"
          onChange={(event) => handleSearchInputChange(event.target.value)}
          id={`search__${displayName}`}
          placeholder="Search"
        />
        <ul>
          {filteredVariants.length ? (
            filteredVariants.map((brand) => {
              return (
                <li key={brand.uniqueId}>
                  <input type="checkbox" id={brand.uniqueId} />
                  <label htmlFor={brand.uniqueId}>{brand.displayName}</label>
                </li>
              );
            })
          ) : (
            <p>No items found matching the search criteria</p>
          )}
        </ul>
      </section>
    </details>
  );
};

export default List;
