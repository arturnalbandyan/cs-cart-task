import React, { useCallback, useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import useCheckedValues from "../../hooks/useCheckedValues";

import "./List.module.scss";

const specialBrands = [
  { name: "Nike", logo: "⭐" },
  { name: "Adidas", logo: "👟" },
];

const List = ({ data, reset, callback }) => {
  const { displayName, listVariants } = data;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVariants, setFilteredVariants] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});

  useEffect(() => {
    setFilteredVariants([...listVariants]);
  }, [listVariants]);

  const resetState = () => {
    handleSearchInputChange("");
    setSelectedVariants({});
  };

  useEffect(() => {
    resetState();

    return callback();
  }, [reset, callback]);

  const filterVariants = (input) => {
    const lowercasedInput = input?.toLowerCase();
    return listVariants.filter((variant) =>
      variant?.displayName.toLowerCase().includes(lowercasedInput)
    );
  };

  const handleSearchInputChange = useCallback((brandName) => {
    setSearchTerm(brandName);
    debouncedFilterVariants(brandName);
  });

  const debouncedFilterVariants = useDebounce((brandName) => {
    const filteredVariants = filterVariants(brandName);
    setFilteredVariants(filteredVariants);
  }, 300);

  const handleCheckboxChange = useCallback((uniqueId) => {
    setSelectedVariants((prevSelectedVariants) => ({
      ...prevSelectedVariants,
      [uniqueId]: !prevSelectedVariants[uniqueId],
    }));
  });

  const renderDisplayName = (brand) => {
    const isSpecialBrand = specialBrands.find(
      (item) => item.name === brand.displayName
    );

    return (
      <label htmlFor={brand.uniqueId}>
        {isSpecialBrand
          ? `${brand.displayName} ${isSpecialBrand.logo || ""}`
          : brand.displayName}
      </label>
    );
  };

  const Variants = () => (
    <ul>
      {filteredVariants.length ? (
        filteredVariants.map((brand) => {
          return (
            <li key={brand.uniqueId}>
              <input
                type="checkbox"
                id={brand.uniqueId}
                checked={selectedVariants[brand.uniqueId] || false}
                onChange={() => handleCheckboxChange(brand.uniqueId)}
              />
              {renderDisplayName(brand)}
            </li>
          );
        })
      ) : (
        <p>No items found matching the search criteria</p>
      )}
    </ul>
  );

  return (
    <details open>
      <summary>
        {`${displayName} ${useCheckedValues(selectedVariants).length || ""}`}
      </summary>
      <section aria-label="brands-heading">
        <input
          value={searchTerm}
          type="text"
          onChange={(e) => handleSearchInputChange(e.target.value)}
          id={`search__${displayName}`}
          placeholder="Search"
        />
        <Variants data={data} />
      </section>
    </details>
  );
};

export default List;
