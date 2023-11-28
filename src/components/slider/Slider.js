import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import styles from "./Slider.module.scss";
import "react-range-slider-input/dist/style.css";

const Slider = ({ data }) => {
  const { displayName, sliderMinValue, sliderMaxValue, sliderValuePrefix } =
    data;

  const [rangeValue, setRangeValue] = useState([
    sliderMinValue,
    sliderMaxValue,
  ]);
  
  const handlePriceInputChange = (selector, value) => {
    setRangeValue((prevRangeValue) => {
      return selector === "min"
        ? [+value, prevRangeValue[1]]
        : [prevRangeValue[0], +value];
    });
  };

  const MinMaxContainer = () => (
    <div className={styles.range__container__price}>
      <label className={styles.range__container__price__container}>
        <span className={styles.range__container__price__container__currency}>
          {sliderValuePrefix}
        </span>
        <input
          value={rangeValue[0]}
          className={styles.range__container__price__input}
          type="text"
          id="min__price"
          aria-label="Minimum Price"
          onChange={(event) =>
            handlePriceInputChange(
              "min",
              event.target.value.replace(/[^0-9]/g, "")
            )
          }
        />
      </label>
      <span aria-hidden="true" className={styles.range__container__price__container__center__line}>
        -
      </span>
      <label className={styles.range__container__price__container}>
        <span className={styles.range__container__price__container__currency}>
          {sliderValuePrefix}
        </span>
        <input
          value={rangeValue[1]}
          className={styles.range__container__price__input}
          type="text"
          id="max__price"
          aria-label="Maximum Price"
          onChange={(event) =>
            handlePriceInputChange(
              "max",
              event.target.value.replace(/[^0-9]/g, "")
            )
          }
        />
      </label>
    </div>
  );

  return (
    <details open className={styles.range__container}>
      <summary>{displayName}</summary>
      <section aria-label="brands-heading">
        <MinMaxContainer />
        <RangeSlider
          min={sliderMinValue}
          max={sliderMaxValue}
          onInput={(item) => setRangeValue(item)}
          value={rangeValue}
          className={styles.range__container__slider}
        />
      </section>
    </details>
  );
};

export default Slider;
