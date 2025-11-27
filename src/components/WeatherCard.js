import React from "react";

function WeatherCard({city, weather}) {
    const {main, weather: weatherArr, wind, sys, name} = weather;
    const details = weatherArr[0];

    const iconUrl = `https://openweathermap.org/img/wn/${details.icon}@2x.png`;

    return(
        <div className="weather-card">
            <div className="weather-header">
                <h2>
                    {name}, {sys.country}
                </h2>
                <p>{details.main}</p>
            </div>

            <div className="weather-main">
                <img src={iconUrl} alt={details.description}/>
                <div className="temp-block">
                    <span className="temp">{Math.round(main.temp)}°C</span>
                    <span className="description">{details.description}</span>
                </div>
            </div>

            <div className="weather-extra">
                <div>
                    <span>Feels like</span>
                    <strong>{Math.round(main.feels_like)}°C</strong>
                </div>
                <div>
                    <span>Humidity</span>
                    <strong>{main.humidity}%</strong>
                </div>
                <div>
                    <span>Wind</span>
                    <strong>{wind.speed} m/s</strong>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;