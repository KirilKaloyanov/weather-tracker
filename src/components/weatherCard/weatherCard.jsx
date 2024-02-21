import "./weatherCard.css";

function WeatherCard({ weatherInfo }) {
  const updatedTimeUTCplus2 = new Date(weatherInfo.localObservationDateTime);
  updatedTimeUTCplus2.setHours(updatedTimeUTCplus2.getHours() + 2);

  return (
    <div
      className={`card ${
        updatedTimeUTCplus2.getHours() < 12 ? "blue" : "yellow"
      }_shadow`}
    >
      <div className="display_flex align_items_center">
        <img
          className="weather_icon"
          src={`https://developer.accuweather.com/sites/default/files/${
            weatherInfo.weatherIcon < 10
              ? "0" + weatherInfo.weatherIcon
              : weatherInfo.weatherIcon
          }-s.png`}
        />
        <center>
          <div>
            {updatedTimeUTCplus2.toISOString().replace("T", " ").slice(11, -5)}
          </div>
          <div>{weatherInfo.weatherText}</div>
        </center>
      </div>
      <div>Облачна покривка: {weatherInfo.cloudCover} %</div>
      {weatherInfo.hasPrecipitation ? (
        <div>
          Валеж: {weatherInfo.precipitationSummary.precipitation.metric.value}{" "}
          {weatherInfo.precipitationSummary.precipitation.metric.unit}
        </div> //precipitation
      ) : (
        //precipitaion
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
