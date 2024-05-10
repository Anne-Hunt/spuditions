import { AppState } from "../AppState.js"
import { Park } from "../models/Park.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class ParksService {

  async searchParks(searchQuery) {
    AppState.parks = []
    const response = await api.get(`api/parks/search?query=${searchQuery}`)
    const parks = response.data.map(parkData => new Park(parkData))
    AppState.parks = parks
    logger.log(parks)
  }

//!SECTION - Gets all parks to the page
  async getParks() {
    const response = await api.get('api/parks')
    logger.log('Got parks!', response.data)
    const parks = response.data.map(parkData => new Park(parkData))
    const sortedParks = parks.sort((a, b)=> a.name.localeCompare(b.name)) //this sorts the array by the name key, alphabetically, comparing each name to the next and shuffling them until they're in descending alphabetical order
    AppState.parks = sortedParks
  }

  //!SECTION - Gets one park by its id
  async getParkById(parkId){
    const response = await api.get(`api/parks/${parkId}`)
    logger.log("Got the park by its Id", response.data)
    const park = new Park(response.data)
    AppState.activePark = park
  }

	// // NOTE: goes through visitedService now
  // async createReview(reviewData, parkId) {
	// 	logger.log("happy lil' star")
	// 	const userId = AppState.account.id
	// 	const response = await api.post(`api/parks/${parkId}/visited`, reviewData)
	// 	logger.log('CREATED REVIEW ⭐🔧', response.data)
	// 	const newReview = new Visited(response.data)
	// 	AppState.visited.unshift(newReview)
	// 	// const park.isVisited = true
	// }
}

export const parksService = new ParksService()