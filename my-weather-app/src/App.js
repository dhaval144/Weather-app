import React , { useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const url = 'https://api.openweathermap.org/data/2.5/weather';
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState([]);

  const fetchWeather = async (city) =>{
    const {data} = await axios
      .get(url,{
        params:{
            q:city,
            units:'metric',
            APPID: '8ec5ef1c79f12ec9f76c1dfb47683d4f'
        }
    });
    return data;
}
  
  const search = async (e) => {
      if(e.key === 'Enter'){
        const data = await fetchWeather(city);
        setWeather(data);
        setCity('');
      }
  }
  
  return (
    <div className='main-container'>
    <input type='text' className='search' placeholder='Enter your TimeZone Place' value={city} 
      onChange={(e)=> setCity(e.target.value)} onKeyPress={search}></input>
    {weather.main && (
      <div className="city">
        <h2 className="city-name">
          <span>{weather.name}</span>
          <sup>{weather.sys.country}</sup>
        </h2>
        <div className="city-temp">
          {Math.round(weather.main.temp)}
          <sup>&deg;C</sup>
        </div>
        <div className="info">
        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
          alt={weather.weather[0].desccription}>
        </img>
        <p>{weather.weather[0].description}</p>
        </div>
      </div>
    )}
    </div>
  );
}

export default App;