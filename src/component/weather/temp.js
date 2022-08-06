// https://api.openweathermap.org/data/2.5/weather?q=dhanbad&appid=12c095d850be2d67dd3412d25061fd89

import React, { useState, useEffect } from 'react';
import Weathercard from './weathercard';
import './saif.css';

const Temp = () => {
  const [searchValue, setSearchValue] = useState("dhanbad");
  const [tempInfo, setTempInfo] = useState({});


  const getWeatherCondition = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=12c095d850be2d67dd3412d25061fd89`;

      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunrise, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunrise,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherCondition();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="searchButton" type="button"
            onClick={getWeatherCondition}>
            Search
          </button>
        </div>
      </div>
      {/* {our temp card} */}

      <Weathercard tempInfo={tempInfo}/>
    </>
  )
}

export default Temp