import "./diagram.css";

function PDiagram({ data, windowWidth }) {
  const daysOfWeek = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  return (
    <>
      <div className="diagram precipitaion-diagram" style={windowWidth}>
        <div className="x-axis"></div>
        <div className="y-axis"></div>

        <div className="t_bar t_bar_legend  t_morning" style={{ top: `-10px` }}>
          <div className="t_legend">мм, валежи</div>
        </div>

        {data.map((x, index) => {
          const xAxisOffsetFraction = (index + 0.5) / data.length;
          const value = x.morning.precipitationSummary.past24Hours.metric.value;
          return (
            <div key={x.id}>
              {x.morning && (
                <div
                  className="p_stick t_morning"
                  style={{
                    height: `${value * 10}px`,
                    left: `${xAxisOffsetFraction * 100}%`,
                  }}
                >
                  <span
                    className="t_label"
                    style={{
                      height: `${(value + 1) * 10}px`,
                      left: `${xAxisOffsetFraction * 100}%`,
                    }}
                  >
                    {value}
                  </span>
                </div>
              )}

              <div
                style={{
                  left: `${xAxisOffsetFraction * 100 - 2}%`,
                  bottom: "-30px",
                  position: "absolute",
                }}
              >
                <center>{daysOfWeek[x.dayOfTheWeek]}</center>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default PDiagram;
