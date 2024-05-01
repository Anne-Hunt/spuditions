
import axios from "axios";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
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
		// REVIEW: Does it split location into lat and lon?
        const locationData = AppState.activePark.location.split(', ')

		// REVIEW: Does calling the array like this work?
		const response = await weatherApi.get(`forecast?lat=${locationData[0]}&lon=${locationData[1]}`)

		logger.log('GOT WEATHER ❄️', response.data);

		const activeWeather = response.data.list.map(weatherData => new Weather(weatherData))

		AppState.activeWeather = activeWeather
	}

}

export const weathersService = new WeathersService()
