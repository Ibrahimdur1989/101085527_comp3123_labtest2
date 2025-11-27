import './App.css';
import { useEffect, useState } from 'react';
import searchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const API_BASE = "https://api.openweathermap.org/data/2.5/weather";

function App() {

  const [city, setCity] = useState("Toronto");
  const [weather, setWeather] = useState("null");
  const [loading, setLoading] = useState("false");
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    try {
      setLoading(true);
      setError("");

      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

      const response = await fetch(
        `${API_BASE}?q=${cityName}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
      setCity(cityName);      
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchWeather("Toronto");
  }, []);

  const handleSearch = (value) => {
    fetchWeather(value);
  };


  return (
    <div className="App">
      <h1 className='app-title'>Weather Now</h1>
      <searchBar onSearch={handleSearch}/>

      {loading && <p className='info-text'>loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {weather && !loading && !error && (
        <WeatherCard city={city} weather={weather}/>
      )}
    </div>
  );
}

export default App;
