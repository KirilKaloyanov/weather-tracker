import { useLayoutEffect as useEffect, useRef, useState } from "react";

import { debounce } from "lodash";

import useFetchWeather from "./useFetch/useFetch.js";

import DailyWeather from "./components/dailyWeather/dailyWeather.jsx";
import NaviDots from "./components/naviDots.jsx";

function App() {
  const dashboardRef = useRef(null);

  const [dashboardWindowWidth, setDashboardWindowWidth] = useState(null);
  const [visibleCardsCount, setVisibleCardsCount] = useState(null);
  const [scrollLeftValue, setScrollLeftValue] = useState(0);

  const { data, isLoading, isError } = useFetchWeather();

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
    debounce((scrollLeft) => setScrollLeftValue(scrollLeft), 300)
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
    return (
      <>
        <h1 className="margin_0 padding_20 dark_background">
          <center>Метеорологична станция Подем</center>
        </h1>

        <NaviDots
          navigationDotsCount={data.length - visibleCardsCount + 1}
          onScroll={(index) => scroll(index)}
          scrollLeftValue={scrollLeftValue}
        />

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

        <NaviDots
          navigationDotsCount={data.length - visibleCardsCount + 1}
          onScroll={(index) => scroll(index)}
          scrollLeftValue={scrollLeftValue}
        />

        <footer className="padding_20 dark_background">
          <center>Cosmos webstudio</center>
        </footer>
      </>
    );
  }
}

export default App;
