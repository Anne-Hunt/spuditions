import { AppState } from "../AppState.js"
import { Visited } from "../models/Visited.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class ReviewService{

    async createReview(reviewData){
        const userId = AppState.account.id
        reviewData.creatorId = userId
        const response = await api.post(`api/parks/:parkId`, reviewData)
        const review = new Visited(response.data)
        AppState.reviews.push(review)
    }

    async editReview(reviewData, reviewId){
        const response = await api.put(`account/reviews`, reviewData)
        const review = new Visited(response.data)
        const reviewOld = AppState.reviews.findIndex(reviewId)
        AppState.reviews.splice(reviewOld, 1)
        AppState.reviews.push(review)
    }

    async removeReview(reviewId){
        const response = await api.delete(`account/reviews`, reviewId)
        const reviewOld = AppState.reviews.findIndex(reviewId)
        AppState.reviews.splice(reviewOld)
        logger.log("Deleted", response.data)
    }

    async getReviewsByPark(){
        const response = await api.get(`api/parks/:parkId`)
        const reviews = response.data.map(reviewData => new Visited(reviewData))
        AppState.reviews = reviews
    }

    async getReviewsByProfile(){
        const response = await api.get(`profile/:profileId`)
        const reviews = response.data.map(reviewData => new Visited(reviewData))
        AppState.reviews = reviews
    }
}

export const reviewService = new ReviewService()