import "./naviDots.css";

function NaviDots({ navigationStepsCount, scrollToIndex, scrollLeftValue }) {
  let currentIndex = scrollLeftValue / 350;
  const zeroIndex = currentIndex == 0;
  const lastIndex = currentIndex == navigationStepsCount - 1;

  const dotsArray = Array.from({ length: navigationStepsCount });

  return navigationStepsCount > 1 ? (
    <div className="navigation_dots">
      <button
        className="arrow left"
        onClick={!zeroIndex ? () => scrollToIndex(--currentIndex) : null}
      ></button>

      {dotsArray.map((sp, index) => (
        <button
          key={index}
          className={`dot border ${
            currentIndex == index ? "filled_dot" : "empty_dot"
          }`}
          onClick={() => scrollToIndex(index)}
        ></button>
      ))}

      <button
        className="arrow right"
        onClick={!lastIndex ? () => scrollToIndex(++currentIndex) : null}
      ></button>
    </div>
  ) : null;
}

export default NaviDots;
