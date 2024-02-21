import { useLayoutEffect as useEffect, useRef, useState } from "react";

import { debounce } from "lodash";

import useFetchWeather from "./useFetch/useFetch.js";

import DailyWeather from "./components/dailyWeather/dailyWeather.jsx";
import NaviDots from "./components/naviDots.jsx";

function App() {
  // Fetch data
  const { data, isLoading, isError } = useFetchWeather("lastTenDays"); //lastTenDays

  // Get a ref to the dashboard window which accommodates the data
  const dashboardRef = useRef(null);

  // Define how many cards can fit in the dashboard
  // based on the width of the browser window
  // each card is 350px
  const [visibleCardsCount, setVisibleCardsCount] = useState(null);
  useEffect(() => {
    if (dashboardRef.current && data.length) {
      setVisibleCardsCount(Math.floor(dashboardRef.current.clientWidth / 350));
    }
  }, [data]);

  // Narrow down the dashboard window to accommodate the number of cards
  // which can fit
  const [dashboardWindowWidth, setDashboardWindowWidth] = useState(null);
  useEffect(() => {
    if (visibleCardsCount) {
      setDashboardWindowWidth({
        maxWidth: dashboardRef.current
          ? visibleCardsCount * 350 + "px"
          : "auto",
      });
    }
  }, [visibleCardsCount]);

  // Initialize the left scroll to 0
  const [leftScrollValue, setLeftScrollValue] = useState(0);

  // Trigger scroll when user clicks on NaviDots
  function scrollToIndex(index) {
    const updatedScroll = index * 350;
    dashboardRef.current.scrollTo({
      left: updatedScroll,
      behavior: "smooth",
    });
    setLeftScrollValue(updatedScroll);
  }

  // Listen for user scrolling and update the left scroll value
  function handleScroll() {
    if (dashboardRef.current) {
      const scrollLeft = dashboardRef.current.scrollLeft;
      debouncedSetScrollLeftValue.current(scrollLeft);
    }
  }

  // Helper function to limit function calls while scrolilng
  const debouncedSetScrollLeftValue = useRef(
    debounce((scrollLeft) => setLeftScrollValue(scrollLeft), 300)
  );

  if (isError) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading</h1>;
  if (data) {
    console.log(data);
    // The count of dots
    const navigationDotsCount = data.length - visibleCardsCount + 1;
    return (
      <>
        <h1 className="margin_0 padding_20 dark_background">
          <center>Метеорологична станция Подем</center>
        </h1>

        <NaviDots
          navigationDotsCount={navigationDotsCount}
          scrollToIndex={scrollToIndex}
          scrollLeftValue={leftScrollValue}
        />

        <div
          ref={dashboardRef}
          className="display_flex overflow_x margin_0"
          style={dashboardWindowWidth}
          onScroll={handleScroll}
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
          navigationDotsCount={navigationDotsCount}
          scrollToIndex={scrollToIndex}
          scrollLeftValue={leftScrollValue}
        />
        <div class="diagram">
          <div class="x-axis"></div>
          <div class="y-axis"></div>
          <div class="bar"></div>
        </div>

        <footer className="padding_20 dark_background">
          <center>Cosmos webstudio</center>
        </footer>
      </>
    );
  }
}

export default App;
