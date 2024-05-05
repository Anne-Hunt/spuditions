import axios from "axios"
import { AppState } from "../AppState.js"

const npsApi = axios.create({
	baseURL: 'https://developer.nps.gov/api/',
	timeout: 10000,
	params: {
	appid: 'q3UaeZF3jn0ALJgfRnxHAOjqeJKam0OrPLEciKe8'
	}
 })

class NationalParksService{

    async getWebcam() {
        if(AppState.activePark.parkCode){
            return
        }
        const response = await npsApi.get(`api/v1/webcam/?parkCode=${park.parkCode}`)
    }
}

export const nationalParksService = new NationalParksService()