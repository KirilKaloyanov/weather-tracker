import { useState } from "react";

import useFetchWeather from "./useFetch/useFetch.js";

import Dashboard from "./components/dashboard.jsx";
import Diagram from "./components/diagram/diagram.jsx";

function App() {
  // Fetch data
  const { data, isLoading, isError } = useFetchWeather("lastTenDays"); //lastTenDays

  const windowWidthState = useState(null);
  const windowWidth = windowWidthState[0];

  if (isError) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading</h1>;
  if (data) {
    return (
      <>
        <h1 className="margin_0 padding_20 dark_background">
          <center>Метеорологична станция Подем</center>
        </h1>

        <Dashboard data={data} windowWidthState={windowWidthState} />

        <Diagram data={data} windowWidth={windowWidth} />

        <footer className="padding_20 dark_background">
          <center>Cosmos webstudio</center>
        </footer>
      </>
    );
  }
}

export default App;
