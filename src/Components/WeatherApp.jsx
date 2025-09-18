import React from 'react'

const WeatherApp = ({icon, temp, city, humidity, windSpeed}) => {
  return (
    <>
        <div className="img pt-10">
          <img className='m-auto w-30' src={icon} alt="" />
        </div>
        <div className="temprature py-3">
          <p className='text-2xl'>{temp}&deg;c</p>
          <p className='text-xl'>{city}</p>
        </div>
        <div className="additional flex justify-evenly pt-6">
          <div className="humidity flex">
            <div className='w-12'>
            <img className='' src="https://img.icons8.com/?size=100&id=3023&format=png&color=000000" alt="" /></div>
            <div>
              <p>{humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className="windSpeed flex">
            <div className='w-12'><img src="https://img.icons8.com/?size=100&id=GAUmg88zKDEA&format=png&color=000000" alt="" /></div>
            <div>
              <p>{windSpeed} Km/h</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
    
    
    
    </>
  )
}

export default WeatherApp
