import { AppState } from "../AppState.js"
import { Reputation } from "../models/Reputation.js"
import { api } from "./AxiosService.js"


class ReputationService{

    async createReputation(reviewData){
        const repData = reviewData
        const creatorId = AppState.account.id
        const profileId = AppState.activeProfile.id
        repData.creatorId = creatorId
        repData.profileId = profileId
        const response = await api.post('api/reputation', repData)
        const reputation = new Reputation(response.data)
        AppState.reputation.push(reputation)
    }

    async editReputation(reviewData){
        const repData = reviewData
        const creatorId = AppState.account.id
        const profileId = AppState.activeProfile.id
        repData.creatorId = creatorId
        repData.profileId = profileId
        const response = await api.post('api/reputation', repData)
        const reputation = new Reputation(response.data)
        const repIndex = AppState.reputation.findIndex(rep => rep.id == reputation.id)
        AppState.reputation.splice(repIndex, 1)
        AppState.reputation.push(reputation)
    }
}

export const reputationService = new ReputationService()