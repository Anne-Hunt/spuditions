import { AppState } from "../AppState.js"
import { Reputation } from "../models/Reputation.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"


class ReputationService{

    async createReputation(reviewData){
        try {
            const repData = reviewData
            const creatorId = AppState.account.id
            const profileId = AppState.activeProfile.id
            repData.creatorId = creatorId
            repData.profileId = profileId
            const response = await api.post('api/reputation', repData)
            const reputation = new Reputation(response.data)
            AppState.reputation.push(reputation)
        } catch (error) {
            logger.error('unable to create reputation', error)
            Pop.toast("Unable to submit review at this time", 'error')
        }
    }
}

export const reputationService = new ReputationService()