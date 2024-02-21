import { last } from "lodash";

function NaviDots({ navigationDotsCount, scrollToIndex, scrollLeftValue }) {
  let currentIndex = scrollLeftValue / 350;
  const zeroIndex = currentIndex == 0;
  const lastIndex = currentIndex == navigationDotsCount - 1;
  console.log(lastIndex);
  const dotsArray = Array.from({ length: navigationDotsCount });
  return navigationDotsCount > 1 ? (
    <div className="navigation_dots">
      <button
        className="arrow left"
        onClick={!zeroIndex ? () => scrollToIndex(--currentIndex) : null}
      ></button>
      {dotsArray.map((sp, index) => (
        <div
          key={index}
          className={`dot border ${
            currentIndex == index ? "filled_dot" : "empty_dot"
          }`}
          onClick={() => scrollToIndex(index)}
        ></div>
      ))}
      <button
        className="arrow right"
        onClick={!lastIndex ? () => scrollToIndex(++currentIndex) : null}
      ></button>
    </div>
  ) : null;
}

export default NaviDots;
