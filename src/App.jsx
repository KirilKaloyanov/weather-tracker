import { useLayoutEffect as useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DailyWeather from "./components/dailyWeather/dailyWeather.jsx";

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["data"],
    queryFn: () => {
      return axios
        .get("https://weather-tracker-de4c4456558d.herokuapp.com/lastTenDays")
        .then((result) => result.data)
        .catch((err) => console.log(err));
    },
  });

  const dashboardRef = useRef(null);
  const [dashboardWindow, setDashboardWindow] = useState(null);

  useEffect(() => {
    if (dashboardRef.current && data.length) {
      const dashboardWidth = dashboardRef.current.clientWidth;

      setDashboardWindow({
        maxWidth: dashboardRef.current
          ? Math.floor(dashboardWidth / 340) * 340 + "px"
          : "auto",
      });
    }
  }, [data, dashboardRef.current]);

  if (isError) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading</h1>;
  if (data) {
    // console.log(data);
    return (
      <>
        <h1 className="margin_0 padding_20 dark_background">
          <center>Метеорологична станция Подем</center>
        </h1>
        <div
          ref={dashboardRef}
          className="display_flex overflow_x"
          style={dashboardWindow}
        >
          {data.map((x) => (
            <DailyWeather
              key={x.id}
              morning={x.morning}
              noon={x.noon}
              dayOfTheWeek={x.dayOfTheWeek}
            />
          ))}
        </div>
        <footer className="padding_20 dark_background">
          <center>Cosmos webstudio</center>
        </footer>
      </>
    );
  }
}

export default App;
