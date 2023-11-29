import React, { useState } from "react";
import List from "../../components/list/List";
import Slider from "../../components/slider/Slider";
import useFetchFilters from "../../hooks/useFetchFilters";
import ResetIcon from "../../assets/icons/ResetIcon";

import styles from "./Home.module.scss";

const Home = () => {
  const filters = useFetchFilters("filters.json");
  const [resetState, setResetState] = useState(false);
  if (!filters) {
    return <div>Loading...</div>;
  }

  const changeResetState = () => {
    setResetState(false);
  };

  const ResetData = () => {
    return (
      <div className={styles.reset__container}>
        <button
          className={styles.reset__container__button}
          onClick={() => setResetState(true)}
        >
          <ResetIcon width={10} height={10} />
          Reset
        </button>
      </div>
    );
  };

  return (
    <main>
      {filters.map((item) => (
        <React.Fragment key={item.uniqueId}>
          {item.type === "list" ? (
            <List data={item} reset={resetState} callback={changeResetState} />
          ) : (
            <Slider
              data={item}
              reset={resetState}
              callback={changeResetState}
            />
          )}
        </React.Fragment>
      ))}
      <ResetData />
    </main>
  );
};

export default Home;
