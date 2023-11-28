import React from "react";
import List from "../../components/list/List";
import Slider from "../../components/slider/Slider";
import useFetchFilters from "../../hooks/useFetchFilters";

const Home = () => {
  const filters = useFetchFilters("filters.json");

  if (!filters) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      {filters.map((item) => (
        <React.Fragment key={item.uniqueId}>
          {item.type === "list" ? (
            <List  data={item} />
          ) : (
            <Slider data={item} />
          )}
        </React.Fragment>
      ))}
    </main>
  );
};

export default Home;
