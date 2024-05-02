import { dbContext } from "../db/DbContext.js"

class ReputationService {
    async getReputationOnProfile(profileId) {
        const reputation = await dbContext.Reputation.find({ receiverId: profileId })
        return reputation
    }
}

export const reputationService = new ReputationService()