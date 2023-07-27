import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleCityChange = useCallback((cityName) => {
    setShowLoader(true);
    setIsError(false);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6e037cf6c9092ffd7ecf07262a8a35db&units=metric`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
            .then(data => {
              const returnedData = {
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main
              };
              setShowLoader(false);
              setWeatherData(returnedData);
            });
        } else {
          setIsError(true);
          setShowLoader(false);
        }
      })
  }, [])



  return (
    <section>
      <PickCity action={handleCityChange} />
      {(weatherData && !isError) && <WeatherSummary {...weatherData} />}
      {showLoader && <Loader />}
      {isError && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;