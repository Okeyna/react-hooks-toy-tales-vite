import React from "react";
import ToyCard from "./ToyCard";
import { useToys } from "../context/ToysContext";

function ToyContainer() {
  const { toys } = useToys();

  const toyList = toys.map((toy) => {
    return <ToyCard key={toy.id} toy={toy} />;
  });
  return (
    <div id="toy-collection">
      {toyList}
    </div>
  );
}

export default ToyContainer;
