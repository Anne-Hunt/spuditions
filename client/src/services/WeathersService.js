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

import axios from "axios";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";
import { Weather } from "../models/Weather.js";


const weatherApi = axios.create({
	baseURL: 'https://api.openweathermap.org/data/2.5/',
	timeout: 10000,
	params: {
	appid: '9ca98a71086798921d830bfbef3db5d7'
	}
 })


class WeathersService {

	async getWeather() {
		// TODO: Once model is finished, get lat and lon called correctly
		const response = await weatherApi.get(`forecast?lat=${lat}&lon=${lon}`)
		logger.log('GOT WEATHER ❄️', response.data);
		const activeWeather = response.data.list.map(weatherData => new Weather(weatherData))

		AppState.activeWeather = activeWeather
	}

}

export const weathersService = new WeathersService()




