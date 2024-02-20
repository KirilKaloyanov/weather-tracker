import WeatherCard from "../weatherCard/weatherCard.jsx";
import "./dailyWeather.css";

function DailyWeather({ morning, noon, dayOfTheWeek }) {
  console.log();

  const daysOfWeek = [
    "Неделя",
    "Понеделник",
    "Вторник",
    "Сряда",
    "Четвъртък",
    "Петък",
    "Съобта",
  ];
  const dayOfWeek = daysOfWeek[dayOfTheWeek];

  const updatedTimeUTCplus2 = new Date(morning.localObservationDateTime);
  updatedTimeUTCplus2.setHours(updatedTimeUTCplus2.getHours() + 2);

  return (
    <div className="shrink_zero card_width">
      <center className="card">
        <strong>{dayOfWeek}</strong>
        <div>
          {updatedTimeUTCplus2.toISOString().replace("T", " ").slice(0, -13)}
          <br />
        </div>
      </center>
      {morning ? <WeatherCard weatherInfo={morning} /> : <div></div>}
      {noon ? <WeatherCard weatherInfo={noon} /> : <div></div>}
    </div>
  );
}

export default DailyWeather;
