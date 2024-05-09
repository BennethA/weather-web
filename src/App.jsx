import { useState } from 'react'
import rainyDay from '/rainyDay.mp4'
import mistCloud from '/mistCloud.mp4'
import fewClouds from '/fewClouds.mp4'
import rainyNight from '/rainyNight.mp4'
import snowyCloud from '/snowyCloud.mp4'
import snowyNight from '/snowyNight.mp4'
import clearCloud from '/clearCloud.mp4'
import clearNight from '/clearNight.mp4'
import brokenCloud from '/brokenCloud.mp4'
import cloudyNight from '/cloudyNight.mp4'
import heavyRainyDay from '/heavyRainyDay.mp4'
import thunderStormDay from '/thunderStormDay.mp4'
import heavyRainyNight from '/heavyRainyNight.mp4'
import brokenCloudNight from '/brokenCloudNight.mp4'
import thunderStormNight from '/thunderStormNight.mp4'
import { FaBolt, FaCloud, FaCloudMoon, FaCloudRain, FaCloudShowersWater, FaCloudSun, FaMagnifyingGlass, FaMoon, FaSmog, FaSnowflake, FaSun } from 'react-icons/fa6'

const App = () => {
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [temperature, setTemperature] = useState('');
  const [citycoutryName, setCityCoutryName] = useState('');

  const [wicon, setWicon] = useState()  
  const [errors, setErrors] = useState('')  
  const [wVid, setWVid] = useState()  
  const [inputSearch, setInputSearch] = useState('')  
  
  const [time, setTime] = useState('')  
  const [date, setDate] = useState('')  
   
  let api_key = import.meta.env.VITE_REACT_APP_API_KEY
  
  const handleSearch = async (e) => {
    e.preventDefault()
    if (inputSearch === ''){
      setErrors('Input cannot be empty')
      return 
    } else {
      setErrors('')
    }
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputSearch}&appid=${api_key}`
    
    let response = await fetch(url)
    let data = await response.json()

    const timestamp = data.dt;
    const timezoneOffset = data.timezone
    const localTime = new Date((timestamp + timezoneOffset) * 1000)
    const time = localTime.toLocaleTimeString()
    const date = localTime.toLocaleDateString()
    setTime(time)
    setDate(date)
    
    setHumidity(data.main.humidity + '%')
    setCityCoutryName(data.name + ', ' + data.sys.country)
    setTemperature(`${Math.floor(data.main.temp / 10 )}°C`)
    setWindSpeed(Math.floor(data.wind.speed * 3.6) + 'km/ h')

    if(data.weather[0].icon === '01d') {
      setWVid(clearCloud)
      setWicon(<FaSun className='faSun'/>)
    } else if (data.weather[0].icon === '01n') {
      setWVid(clearNight)
      setWicon(<FaMoon className='faMoon'/>)
    } else if(data.weather[0].icon === '02d') {
      setWVid(fewClouds)
      setWicon(<FaCloudSun className='faCloudSun'/>)
    } else if (data.weather[0].icon === '02n') {
      setWVid(cloudyNight)
      setWicon(<FaCloudMoon className='faCloudMoon'/>)
    } else if(data.weather[0].icon === '03d' || data.weather[0].icon === '04d') {
      setWVid(brokenCloud)
      setWicon(<FaCloud className='faCloudDay'/>)
    } else if(data.weather[0].icon === '03n' || data.weather[0].icon === '04n') {
      setWVid(brokenCloudNight)
      setWicon(<FaCloud className='faCloudNight'/>)
    } else if(data.weather[0].icon === '09d') {
      setWVid(rainyDay)
      setWicon(<FaCloudRain className='faCloudRainDay'/>)
    } else if(data.weather[0].icon === '09n') {
      setWVid(rainyNight)
      setWicon(<FaCloudRain className='faCloudRainNight'/>)
    } else if(data.weather[0].icon === '10d') {
      setWVid(heavyRainyDay)
      setWicon(<FaCloudShowersWater className='faCloudShowersWaterDay'/>)
    } else if(data.weather[0].icon === '10n') {
      setWVid(heavyRainyNight)
      setWicon(<FaCloudShowersWater className='faCloudShowersWaterNight'/>)
    } else if(data.weather[0].icon === '11d') {
      setWVid(thunderStormDay)
      setWicon(<FaBolt className='faBoltDay'/>)
    } else if(data.weather[0].icon === '11n') {
      setWVid(thunderStormNight)
      setWicon(<FaBolt className='faBoltNight'/>)
    } else if (data.weather[0].icon === '13d'){
      setWVid(snowyNight)
      setWicon(<FaSnowflake className='faSnowflakeDay'/>)
    } else if (data.weather[0].icon === '13n'){
      setWVid(snowyCloud)
      setWicon(<FaSnowflake className='faSnowflakeNight'/>)
    } else{
      setWVid(mistCloud)
      setWicon(<FaSmog className='faSmog'/>)
    }
  }
  return (
    <div className='relative'>
      {
        wVid && <video src={wVid} autoPlay loop muted className='absolute inset-0 object-cover object-center w-full h-full -z-50 blur'>
      </video>
      }
      <div className={(wVid ? "bg-none flex items-center justify-center overflow-auto h-lvh" : "bg-gradient-to-b from-[#010008] via-[#000030] to-[#0707a5] flex items-center justify-center overflow-auto h-lvh")}>
        <div className='flex flex-col gap-4 border rounded-xl border-gray-500 p-5 max-h-screen overflow-auto'>
          <form onSubmit={handleSearch} className='flex justify-center flex-col'>
            <div className='flex justify-between gap-4'>
              <input 
              type="search" 
              placeholder="City" 
              className='pl-2 w-full rounded p-1 font-bold'
              onChange={(e) => setInputSearch(e.target.value)} 
              />
              <button className='p-2 rounded bg-white active:bg-black active:text-white hover:bg-black hover:text-white' type='submit'>
                <FaMagnifyingGlass/>
              </button>
            </div>
            <div className="text-[red]">
              {errors}
            </div>
          </form>
          <div className='text-center font-semibold text-[40px] text-white'>
            {citycoutryName}
          </div>
          <div className='flex items-center justify-center gap-2 font-bold text-[100px]'>
            <div>{wicon}</div>
            <div>{temperature}</div>
          </div>
          <div className='flex items-center justify-around text-center border border-gray-500 rounded-xl'>
            <div>
              <div className='font-semibold text-xl'>{humidity}</div>
              <div className='font-bold text-xl'>Humidity</div>
            </div>
            <div>
              <div className='font-semibold text-xl'>{windSpeed}</div>
              <div className='font-bold text-xl'>Wind Speed</div>
            </div>
          </div>
          <div className='text-center text-gray-500 font-bold text-xl'>
            <div>
              {time}
            </div>
            <div>
              {date}
            </div>
          </div>
          <div>
            <iframe className='rounded-2xl w-full' src={`https://www.google.com/maps?q=${citycoutryName}&output=embed`} allowFullScreen/>
          </div>
        </div>
      </div>
    </div>
  )
}
export default App