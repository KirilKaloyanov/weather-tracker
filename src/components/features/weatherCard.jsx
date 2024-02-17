function WeatherCard({ weatherInfo }) {
  const updatedTime = new Date(weatherInfo.localObservationDateTime);
  updatedTime.setHours(updatedTime.getHours() + 2);

  return (
    <>
      <div>{updatedTime.toISOString().replace("T", " ").slice(0, -5)}</div>
      <div>{weatherInfo.weatherText}</div>
      <img
        src={`https://developer.accuweather.com/sites/default/files/${
          weatherInfo.weatherIcon < 10
            ? "0" + weatherInfo.weatherIcon
            : weatherInfo.weatherIcon
        }-s.png`}
      />
      <div>Температура: {weatherInfo.temperature.metric.value}&deg; C</div>
      <div>
        Валеж (24 часа):{" "}
        {weatherInfo.precipitationSummary.past24Hours.metric.value} мм
      </div>
      <hr />
    </>
  );
}

// <img
//                       src={`https://developer.accuweather.com/sites/default/files/${
//                         item.Day.Icon < 10 ? "0" + item.Day.Icon : item.Day.Icon
//                       }-s.png`}
//                       alt={`${item.Day.IconPhrase}`}
//                     />

export default WeatherCard;
