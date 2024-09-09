import React, { useState } from 'react';
import axios from 'axios';
import './index.css';



	const TDate = () => {
		const months = [
			'January','February','March','April','May','June','July','August','September','October','November','December',
		];
		const WeekDays = [
			'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',
		];
		const currentDate = new Date();
		const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
			}`;
		return date;
	};
    function Weather() {
        const [input, setInput] = useState('');
        const [weather, setWeather] = useState({
            loading: false,
            data: {},
            error: false,
        });
    

	const search = async (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			setInput('');
			setWeather({ ...weather, loading: true });
			const url = 'https://api.openweathermap.org/data/2.5/weather';
			const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
			await axios
				.get(url, {
					params: {
						q: input,
						units: 'metric',
						appid: api_key,
					},
				})
				.then((res) => {
					console.log('res', res);
					setWeather({ data: res.data, loading: false, error: false });
				})
				.catch((error) => {
					setWeather({ ...weather, data: {}, error: true });
					setInput('');
					console.log('error', error);
				});
		}
	};

	return (
		<div className="App">
			<h1 className="app">
				 Weather App
			</h1>
			<div className="search">
				<input
					
                    type="text"
					className="city-search"
					placeholder="Enter the city name here"
					
                    
					value={input}
					onChange={(event) => setInput(event.target.value)}
					onKeyPress={search}
				/>
			</div>
			{weather.loading && (
				<>
					<br />
					<br />
					
				</>
			)}
			{weather.error && (
				<>
					<br />
					<br />
					<span className="error-message">
						<span style={{ fontSize: '20px'  }}>City not found.Try a relevant city name</span>
					</span>
				</>
			)}
			{weather && weather.data && weather.data.main && (
				<div>
					<div className="city-name">
						<h2>
							{weather.data.name}, <span>{weather.data.sys.country}</span>
						</h2>
					</div>
					<div className="date">
						<span>{TDate()}</span>
					</div>
					<div className="icon-temp">
						<img
							className=""
							src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
							alt={weather.data.weather[0].description}
						/>
						{Math.round(weather.data.main.temp)}
						<sup className="deg">°C</sup>
					</div>
					<div className="des-wind">
						<p>{weather.data.weather[0].description.toUpperCase()}</p>
						<p>Wind Speed: {weather.data.wind.speed}m/s</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default Weather;
