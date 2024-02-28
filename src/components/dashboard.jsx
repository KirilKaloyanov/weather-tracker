import { useLayoutEffect as useEffect, useRef, useState } from "react";
import DailyWeather from "./dailyWeather/dailyWeather.jsx";
import NaviDots from "./naviDots/naviDots.jsx";
import { debounce } from "lodash";

function Dashboard({ data, windowWidthState }) {
  // Get a ref to the dashboard window which accommodates the data
  const dashboardRef = useRef(null);

  // Define how many cards can fit in the dashboard window
  // based on the width of the browser window
  const [visibleCardsCount, setVisibleCardsCount] = useState(null);

  useEffect(() => {
    if (dashboardRef.current && data.length) {
      setVisibleCardsCount(Math.floor(dashboardRef.current.clientWidth / 350)); // each card is 350px
      setLeftScrollValue(data.length * 350);
      scrollToIndex(data.length - 1);
    }
  }, [data]);

  // Narrow down the dashboard window to accommodate the number of cards
  // which can fit
  // The state of the window width is kept in the parent component
  const [windowWidth, setWindowWidth] = windowWidthState;

  useEffect(() => {
    if (visibleCardsCount) {
      setWindowWidth({
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

  return (
    <>
      <NaviDots
        navigationStepsCount={data.length - visibleCardsCount + 1}
        scrollToIndex={scrollToIndex}
        scrollLeftValue={leftScrollValue}
      />
      <div
        ref={dashboardRef}
        className="display_flex overflow_x margin_0"
        style={windowWidth}
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
        navigationStepsCount={data.length - visibleCardsCount + 1}
        scrollToIndex={scrollToIndex}
        scrollLeftValue={leftScrollValue}
      />
    </>
  );
}

export default Dashboard;
