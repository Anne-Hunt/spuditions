import axios from "axios"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"

const npsApi = axios.create({
	baseURL: 'https://developer.nps.gov/',
	timeout: 10000,
	params: {
	api_key: 'q3UaeZF3jn0ALJgfRnxHAOjqeJKam0OrPLEciKe8'
	}
 })

class NationalParksService{

    async getWebcam(parkCode) {
        if(AppState.activePark.parkCode != 'yell'){
            return
        }
        const response = await npsApi.get(`api/v1/webcam/?parkCode=${parkCode}`)
        const webcam = response.data
        logger.log('webcam data', response.data)
        AppState.webcam = webcam
    }
}

export const nationalParksService = new NationalParksService()