function NaviDots({ navigationDotsCount, scrollToIndex, scrollLeftValue }) {
  const spanArray = Array.from({ length: navigationDotsCount });
  return (
    <div className="navigation_dots">
      {navigationDotsCount > 1
        ? spanArray.map((sp, index) => (
            <div
              key={index}
              className={`border ${
                scrollLeftValue == index * 350 ? "filled_dot" : "empty_dot"
              }`}
              onClick={() => scrollToIndex(index)}
            ></div>
          ))
        : null}
    </div>
  );
}

export default NaviDots;
