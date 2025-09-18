import { useState, useEffect} from 'react'
import './App.css'
import WeatherApp from './Components/WeatherApp'
import sunny from './assets/images/sunny.png'
import cloudy_day from './assets/images/cloudy-day.png'
import rainy_day from './assets/images/rainy-day.png'
import drizzle from './assets/images/drizzle.png'
import snowy from './assets/images/snowy.png'
function App() {

  let api_key = "5c42929771c6b85126fff64798706616"

  const [text, setText] = useState("Chennai")
  const [city, setCity] = useState("Chennai")
  const [icon, setIcon] = useState(sunny)
  const [temperature, setTemperature] = useState(35)
  const [humidity, setHumidity] = useState(20)
  const [windSpeed, setWindSpeed] = useState(3.05)

  const [cityNotFound, setCityNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const weatherIconMap = {
    "01d": sunny,
    "01n": sunny,
    "02d": cloudy_day,
    "02n": cloudy_day,
    "03d": drizzle,
    "03n": drizzle,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rainy_day,
    "09n": rainy_day,
    "10d": rainy_day,
    "10n": rainy_day,
    "13d": snowy,
    "13n": snowy,
  };

  const search = async () => {
    setLoading(true)

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`

    try {
      let res = await fetch(url)
      let data = await res.json()
      
      if(data.cod === "404"){
        console.error("City not found")
        setLoading(false)
        setCityNotFound(true)
        return;
      }

      setTemperature(Math.floor(data.main.temp))
      setHumidity(data.main.humidity)
      setWindSpeed(data.wind.speed)
      setCity(data.city)

      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || sunny)
      cityNotFound(false)

    } catch (error) {
      console.error("An error occured: " , error.message)
      setError("An error occured while fetching weather data")
    }
    finally{
      setLoading(false)
    }
  }

  const handleText = (e) => {
    setText(e.target.value)
  }

  const handleKeyDown = (e) => {
    if(e.key === "Enter"){
      search()
    }
  }

  useEffect(() => {
    search()
  }, [])
  

  return (
    <>
      <div className="mainBox rounded-xl py-10 w-100 m-auto h-full bg-gradient-to-b from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
        <div className="search">
          <input type="text" onChange={handleText} value={text} className='bg-white rounded-3xl h-9 w-60 text-center' placeholder='Search a City' />
          <button onClick={() => search()} className='bg-white text-black mx-2 rounded-full h-9 w-20'>Search</button>
        </div>

        {loading && <div className="loading">Loading...</div>}
        {/* {error && <div className="error">{error}</div>} */}
        {cityNotFound && <div className="">City not found</div>}

        {!loading && !cityNotFound && <WeatherApp city={city} icon={icon} temp={temperature} humidity={humidity}  windSpeed={windSpeed}/>}

      </div>
    </>
  )
}

export default App
