import WeatherCard from "../weatherCard/weatherCard.jsx";
import "./dailyWeather.css";

function DailyWeather({ dailyWeather }) {
  console.log(dailyWeather);

  return (
    <div className="shrink_zero">
      <WeatherCard weatherInfo={dailyWeather.morning} />
      {dailyWeather.noon ? (
        <WeatherCard weatherInfo={dailyWeather.noon} />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default DailyWeather;
