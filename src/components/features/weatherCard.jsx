function WeatherCard({ weatherInfo }) {
  const updatedTime = new Date(weatherInfo.localObservationDateTime);
  updatedTime.setHours(updatedTime.getHours() + 2);

  return (
    <div className="card">
      <div className="title">
        <img
          src={`https://developer.accuweather.com/sites/default/files/${
            weatherInfo.weatherIcon < 10
              ? "0" + weatherInfo.weatherIcon
              : weatherInfo.weatherIcon
          }-s.png`}
        />
        <div>
          <div>
            {updatedTime.toISOString().replace("T", " ").slice(0, -5)}
            <br />
            {weatherInfo.weatherText}
          </div>
        </div>
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
      <hr />
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

      <div>
        <strong>
          Температура: {weatherInfo.temperature.metric.value}&deg; C
        </strong>
      </div>
      <div>
        Усеща се като: {weatherInfo.realFeelTemperature.metric.value}&deg; C
      </div>
      <div>
        Усещане на сянка: {weatherInfo.realFeelTemperatureShade.metric.value}
        &deg; C
      </div>
      <hr />
      <div>Вятър: {weatherInfo.wind.speed.metric.value} км/ч</div>
      <div>Пориви: {weatherInfo.windGust.speed.metric.value} км/ч</div>
      <div>Атмосферно налягане: {weatherInfo.pressure.metric.value} hPa</div>
      <div>
        Налягане (тенденция): {weatherInfo.pressureTendency.localizedText}
      </div>
      <div>Влажност (навън): {weatherInfo.relativeHumidity}</div>
      <div>Влажност (вътре): {weatherInfo.IndoorRelativeHumidity}</div>
    </div>
  );
}

export default WeatherCard;
