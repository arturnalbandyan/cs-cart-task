import React, { memo, useState, useEffect, lazy, useCallback } from "react";
import styles from "./Slider.module.scss";
import "react-range-slider-input/dist/style.css";

const RangeSlider = lazy(() => import("react-range-slider-input"));

const Slider = ({
  data: { displayName, sliderMinValue, sliderMaxValue, sliderValuePrefix },
  reset,
  callback,
}) => {
  const [rangeValue, setRangeValue] = useState([
    sliderMinValue,
    sliderMaxValue,
  ]);

  const resetState = () => {
    setRangeValue([sliderMinValue, sliderMaxValue]);
  };

  useEffect(() => {
    resetState();

    return callback();
  }, [reset, callback]);

  const handlePriceInputChange = useCallback((selector, value) => {
    setRangeValue((prevRangeValue) => {
      return selector === "min"
        ? [+value, prevRangeValue[1]]
        : [prevRangeValue[0], +value];
    });
  });

  const RangeMinMax = () => (
    <div className={styles.range__container__values}>
      <p aria-label={`Minimum ${displayName} value`}>
        {sliderValuePrefix + sliderMinValue}
      </p>
      <p aria-label={`Maximum ${displayName} value`}>
        {sliderValuePrefix + sliderMaxValue}
      </p>
    </div>
  );

  const MinMaxContainer = memo(() => (
    <div className={styles.range__container__price}>
      <label className={styles.range__container__price__container}>
        <legend className={styles.range__container__price__container__currency}>
          {sliderValuePrefix}
        </legend>
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
      <span
        aria-hidden="true"
        className={styles.range__container__price__container__center__line}
      >
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
  ));

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
        <RangeMinMax />
      </section>
    </details>
  );
};

export default Slider;
