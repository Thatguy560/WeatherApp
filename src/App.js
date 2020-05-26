import React, { useState } from 'react';

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery(''); 
          console.log(result);
        });
      }
    } 

  const dateBuilder =(d) => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"];
     let days = ["Sunday", "Mondy", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

     let day = days[d.getDay()];
     let date = d.getDate();
     let month = months[d.getMonth()];
     let year = d.getFullYear();

     return `${day} ${date} ${month} ${year}`
    }
    // {console.log(weather.weather[0].main)}
    // Incorporate more images for type of weather e.g. rain
    // also incorporate more of the weather attributes?
    return (
      // <div className={weather.main.temp > 10 ? 'app warm' : 'app cold'}></div>
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 10) ? 'app warm' : 'app cold') : 'app'}>
    {/* Condition ? return value : condition ? Return value : condition ? return value */}
    {/* weather.weather[0].main */}
      <main>
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Search for a location..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
       <div> 
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}°c
            {console.log(weather.weather[0].main)}
          </div>
          <div className="weather">{weather.weather[0].main}</div>
          <div className="feelslike">Feels like {Math.round(weather.main.feels_like)}°c</div>
          <div className="windspeed">Wind Speed: {Math.round(weather.wind.speed)}mph</div>
        </div>
       </div>
       ) : ('')}
      </main>
    </div>
  );
}
 
export default App;
