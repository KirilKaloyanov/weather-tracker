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
        Усеща се като: {weatherInfo.realFeelTemperature.metric.value}&deg; C
      </div>
      <div>
        Усещане на сянка: {weatherInfo.realFeelTemperatureShade.metric.value}
        &deg; C
      </div>
      <div>
        Минимална t&deg;:{" "}
        {weatherInfo.temperatureSummary.past24HourRange.minimum.metric.value}
        &deg; C
      </div>
      <div>
        Максимална t&deg;:{" "}
        {weatherInfo.temperatureSummary.past24HourRange.maximum.metric.value}
        &deg; C
      </div>
      <div>Облачна покривка: {weatherInfo.cloudCover} %</div>
      {weatherInfo.hasPrecipitation ? (
        <div>
          Валеж: {weatherInfo.precipitationType}{" "}
          {weatherInfo.precipitationSummary.precipitaion.metric.value}{" "}
          {weatherInfo.precipitationSummary.past24Hours.metric.unitType}
        </div>
      ) : (
        <div>Не вали</div>
      )}
      <div>
        Валеж (24 часа):{" "}
        {weatherInfo.precipitationSummary.past24Hours.metric.value} мм
      </div>
      <div>Вятър: {weatherInfo.wind.speed.metric.value} км/ч</div>
      <div>Пориви: {weatherInfo.windGust.speed.metric.value} км/ч</div>
      <div>Атмосферно налягане: {weatherInfo.pressure.metric.value} hPa</div>
      <div>
        Налягане (тенденция): {weatherInfo.pressureTendency.localizedText}
      </div>
      <div>Влажност (навън): {weatherInfo.relativeHumidity}</div>
      <div>Влажност (вътре): {weatherInfo.IndoorRelativeHumidity}</div>
      <hr />
    </>
  );
}

export default WeatherCard;
