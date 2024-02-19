import WeatherCard from "../weatherCard/weatherCard.jsx";
import "./dailyWeather.css";

function DailyWeather({ morning, noon }) {
  console.log();

  return (
    <div className="shrink_zero">
      {morning ? <WeatherCard weatherInfo={morning} /> : <div></div>}
      {noon ? <WeatherCard weatherInfo={noon} /> : <div></div>}
    </div>
  );
}

export default DailyWeather;
