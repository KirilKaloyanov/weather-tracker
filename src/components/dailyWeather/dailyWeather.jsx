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

  return (
    <div className="shrink_zero">
      <center className="card">
        <strong>{dayOfWeek}</strong>
      </center>
      {morning ? <WeatherCard weatherInfo={morning} /> : <div></div>}
      {noon ? <WeatherCard weatherInfo={noon} /> : <div></div>}
    </div>
  );
}

export default DailyWeather;
