import React, { useState } from 'react'
import axios from 'axios';




function App() {
  
 
  const [feed, setfeed] = useState({})
  const [search, setsearch] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=9a2948d628ee9dd326315e963d75e29d`

  const searchLocation = async() => {
    
      try {
        const response =await axios.get(url);
        
        setfeed(response.data)
       
       } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      
    
  
     
    } 
    setsearch('')
  }

 
  return (
    <div className="App">
    <h1 style={{color:'white'}}>Weather App</h1>
    <form onSubmit={Event=>Event.preventDefault()}>
    <input
          value={search}
          onChange={event => setsearch(event.target.value)}
         
          placeholder='Enter Location'
          type="text" />
      <button type="submit"  onClick={searchLocation}>Get Weather</button> 
    </form>
    <div id="weather-data">
      <div className="icon">
      <img src={`http://openweathermap.org/img/wn/${feed.main ? feed.weather[0].icon :''}.png`}/>
      </div>
      <div className="temperature">{feed.name }</div>
      <div className="temperature">{feed.main ? <h1>{Math.round(feed.main.temp)}°F</h1>:null}</div>
      <div className="description"> {feed.weather ? <p>{feed.weather[0].main}</p> :  null}</div>
      <div className="details">
         <div>Feels like:{feed.main ? Math.round(feed.main.feels_like) :null}°C</div>
        <div>Humidity: {feed.main ? feed.main.humidity:null}%</div>
        <div>Wind speed: {feed.main ? feed.wind.speed :null} m/s</div> 
      </div>
    </div>
  </div>
      
  );
}

export default App; 