import { AppState } from "../AppState.js"
import { Park } from "../models/Park.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class ParksService {

//!SECTION - Gets all parks to the page
  async getParks() {
    const response = await api.get('api/parks')
    logger.log('Got parks!', response.data)
    const parks = response.data.map(parkData => new Park(parkData))
    AppState.parks = parks
  }

  //!SECTION - Gets one park by its id
  async getParkById(parkId){
    const response = await api.get(`api/parks/${parkId}`)
    logger.log("Got the park by its Id", response.data)
    const park = new Park(response.data)
    AppState.activePark = park
  }
}

export const parksService = new ParksService()