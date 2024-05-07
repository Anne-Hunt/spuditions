import { AppState } from "../AppState.js"
import { Visited } from "../models/Visited.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class VisitedService{

    async createVisited(reviewData){
		const userId = AppState.account.id
		reviewData.creatorId = userId
		reviewData.parkId = AppState.activePark.id
		const response = await api.post(`api/visited`,reviewData)
		logger.log('CREATED VISITED/REVIEW ⭐🔧', response.data)
		const review = new Visited(response.data)
		AppState.visited.push(review)
    }

    async editVisited(reviewData, reviewId){
        const response = await api.put(`api/visited`, reviewData)
        const review = new Visited(response.data)
        const reviewOld = AppState.visited.findIndex(reviewId)
        AppState.visited.splice(reviewOld, 1)
        AppState.visited.push(review)
    }

    async removeVisited(reviewId){
        const response = await api.delete(`api/visited`, reviewId)
        const reviewOld = AppState.visited.findIndex(reviewId)
        AppState.visited.splice(reviewOld)
        logger.log("Deleted", response.data)
    }

    async getVisitedByPark(){
        const response = await api.get(`api/parks/:parkId`)
        const reviews = response.data.map(reviewData => new Visited(reviewData))
        AppState.visited = reviews
    }

    async getVisitedByProfile(){
        const response = await api.get(`profile/:profileId`)
        const reviews = response.data.map(reviewData => new Visited(reviewData))
        AppState.visited = reviews
    }
}

export const visitedService = new VisitedService()