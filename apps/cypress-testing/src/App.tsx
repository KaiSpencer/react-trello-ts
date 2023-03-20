import { useState } from "react";
import Board from "react-trello-ts";

import data from "../cypress/fixtures/data.json"
function App() {
  return (
    <Board data={data}/>
  );
}

export default App;
