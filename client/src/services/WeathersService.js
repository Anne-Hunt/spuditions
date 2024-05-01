// *************************************************************
//					           MODIFICATION LOG
//
// Date Created: 4/30/2024
// Date Last Modified: 4/30/2024
// Last Modified By: Emma
// 
// #Modification Log:
//     - 4/30/2024: Attempted to add get request for weather api
//**************************************************************

const { AppState } = require("../AppState.js");
const { logger } = require("../utils/Logger.js");
const { api } = require("./AxiosService.js");



async getWeather() {
	const response = await api.get('api/weather')
	// NOTE logger is similar to console, will not break your application during deployment
	logger.log('GOT WEATHER ❄️', response.data);
	AppState.weatherConditions = response.data.weatherConditions.map(weatherData => new Weather(weatherData))
}
