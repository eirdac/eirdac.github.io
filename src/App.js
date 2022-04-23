import './App.css';
import React, {useState, useEffect } from 'react';
import Button from "@mui/material/Button";


function App() { 

    const [locations, setLocations] = useState("london");

    const [weather, setWeather] = useState({});

    const [photos, setPhotos] = useState([]);

    const OW_KEY = "e597543ad67a406d802f893c58ce667b";
    const US_KEY = "I2XingUSOTerv-C-S2RP_qxkSl0fb7_-gDOp2NCpd_g";
 
    // useEffect = when ready to change state, run this function
    useEffect(() => {
      submit();
    }, []);
    

    // calling the weather API
    function submit() {
      // units get turned from K to degrees
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${locations}&appid=${OW_KEY}&units=metric`)

      .then((res) => {
        if (res.ok){
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404)
          {
            return alert("Oops! There is an error. (wrong location)");
          }
          alert("Oops there seems to be an error!");
          throw new Error("you have an error");
        }
      })
      .then((object) => {
        setWeather(object);
        console.log(weather);
      })

      .catch((error) => console.log(error));


      fetch(`https://api.unsplash.com/search/photos?query=${locations}&client_id=${US_KEY}`
      )

      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("You made a mistake!");
        }
      })

      .then((data) => {
        console.log(data);
        setPhotos(data?.results[0]?.urls.raw);
      })
      .catch((error) => console.log(error));
    }

    return (<div className="App">
      <div className="wrapper2"><center>WEATHER APP</center></div>

      <div className="wrapper">
        <div className="search">
          <input type="text" value={locations} onChange={(e) => setLocations(e.target.value)} placeholder="Enter your location" className="location_input"></input>
          <Button onClick={submit}>Search</Button>
        </div>

          <div className="app_data">
            <p className="temp">Current temp: {weather?.main?.temp}</p>
          </div>
          <img className="app_img" src={photos} alt=""></img>
      </div>

    </div>
    );
}
  
export default App;