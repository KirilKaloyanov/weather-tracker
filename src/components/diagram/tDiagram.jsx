import "./diagram.css";

function TDiagram({ data, windowWidth }) {
  console.log(data);

  const daysOfWeek = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  return (
    <>
      <div className="diagram temperature-diagram" style={windowWidth}>
        <div className="x-axis"></div>
        <div className="y-axis y-axis-negative"></div>

        <div className="t_bar t_bar_legend t_noon" style={{ top: `210px` }}>
          <div className="t_legend">t&deg;C,&nbsp;следобед</div>
        </div>

        <div className="t_bar t_bar_legend t_morning" style={{ top: `230px` }}>
          <div className="t_legend">t&deg;C&nbsp; сутрин</div>
        </div>

        {data.map((x, index) => {
          const xAxisOffsetFraction = (index + 0.5) / data.length;
          return (
            <div key={x.id}>
              {x.morning && (
                <div
                  className="t_bar t_morning"
                  style={{
                    bottom: `${x.morning.temperature.metric.value * 10}px`,
                    left: `${xAxisOffsetFraction * 100}%`,
                  }}
                >
                  <span className="t_label">
                    {x.morning.temperature.metric.value}
                  </span>
                </div>
              )}

              {x.noon && (
                <div
                  className="t_bar t_noon"
                  style={{
                    bottom: `${x.noon.temperature.metric.value * 10}px`,
                    left: `${xAxisOffsetFraction * 100}%`,
                  }}
                >
                  <span className="t_label">
                    {x.noon.temperature.metric.value}
                  </span>
                </div>
              )}

              <div
                style={{
                  left: `${xAxisOffsetFraction * 100 - 2}%`,
                  bottom: "-200px",
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

export default TDiagram;
