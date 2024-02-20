import { useLayoutEffect as useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { debounce } from "lodash";
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

  const dashboardCardWidth = 350;
  const dashboardRef = useRef(null);
  const [dashboardWindow, setDashboardWindow] = useState(null);
  const [dashboardPositions, setDashboardPositions] = useState(null);
  const [scrollLeftValue, setScrollLeftValue] = useState(0);

  useEffect(() => {
    if (dashboardRef.current && data.length) {
      setDashboardPositions(
        Math.floor(dashboardRef.current.clientWidth / dashboardCardWidth)
      );
    }
  }, [data]);

  useEffect(() => {
    if (dashboardPositions) {
      setDashboardWindow({
        maxWidth: dashboardRef.current
          ? dashboardPositions * dashboardCardWidth + "px"
          : "auto",
      });
    }
  }, [dashboardPositions]);

  const debouncedSetScrollLeftValue = useRef(
    debounce((scrollLeft) => setScrollLeftValue(scrollLeft), 100)
  );

  function onScroll() {
    if (dashboardRef.current) {
      const scrollLeft = dashboardRef.current.scrollLeft;
      debouncedSetScrollLeftValue.current(scrollLeft);
    }
  }
  console.log(scrollLeftValue);

  if (isError) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading</h1>;
  if (data) {
    const navigationDotsCount = data.length - dashboardPositions + 1;

    const spanArray = Array.from({ length: navigationDotsCount });
    return (
      <>
        <h1 className="margin_0 padding_20 dark_background">
          <center>Метеорологична станция Подем</center>
        </h1>
        <div className="navigation_dots">
          {navigationDotsCount > 1
            ? spanArray.map((sp, index) => (
                <div
                  key={index}
                  className={
                    scrollLeftValue == 0
                      ? "one"
                      : scrollLeftValue < 350
                      ? "two"
                      : ""
                  }
                ></div>
              ))
            : null}
        </div>

        <div
          ref={dashboardRef}
          className="display_flex overflow_x margin_0"
          style={dashboardWindow}
          onScroll={onScroll}
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
