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

  const dashboardRef = useRef(null);
  const [dashboardWindowWidth, setDashboardWindowWidth] = useState(null);
  const [visibleCardsCount, setVisibleCardsCount] = useState(null);
  const [scrollLeftValue, setScrollLeftValue] = useState(0);

  useEffect(() => {
    if (dashboardRef.current && data.length) {
      setVisibleCardsCount(Math.floor(dashboardRef.current.clientWidth / 350));
    }
  }, [data]);

  useEffect(() => {
    if (visibleCardsCount) {
      setDashboardWindowWidth({
        maxWidth: dashboardRef.current
          ? visibleCardsCount * 350 + "px"
          : "auto",
      });
    }
  }, [visibleCardsCount]);

  const debouncedSetScrollLeftValue = useRef(
    debounce((scrollLeft) => setScrollLeftValue(scrollLeft), 100)
  );

  function onScroll() {
    if (dashboardRef.current) {
      const scrollLeft = dashboardRef.current.scrollLeft;
      debouncedSetScrollLeftValue.current(scrollLeft);
    }
  }

  function scroll(index) {
    const updatedScroll = index * 350;
    dashboardRef.current.scrollTo({
      left: updatedScroll,
      behavior: "smooth",
    });
    setScrollLeftValue(updatedScroll);
  }

  if (isError) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading</h1>;
  if (data) {
    const navigationDotsCount = data.length - visibleCardsCount + 1;

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
                  className={`border ${
                    scrollLeftValue == index * 350 ? "filled_dot" : "empty_dot"
                  }`}
                  onClick={() => scroll(index)}
                ></div>
              ))
            : null}
        </div>

        <div
          ref={dashboardRef}
          className="display_flex overflow_x margin_0"
          style={dashboardWindowWidth}
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
