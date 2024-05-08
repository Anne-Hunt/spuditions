import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class ReputationService {
    async editReputation(reputationId, userInfo, reputationData) {
        const reputation = await dbContext.Reputation.findById(reputationId)

        if (!reputation) throw new Error("Could not find reputation by id")

        if (userInfo.id != reputation.creatorId) throw new Forbidden("You cannot edit a reputation that you did not leave.")

        if (userInfo.role == "Banned") throw new Error("Banned users cannot modify reputation.")
    }
    async getReputationOnProfile(profileId) {
        const reputation = await dbContext.Reputation.find({ profileId: profileId })
        return reputation
    }

    async postReputation(reputationData, userInfo) {
        if (reputationData.senderId == userInfo.id) throw new Error("You can't leave reputation on your own profile.")
        const previousReputation = await dbContext.Reputation.find({ creatorId: reputationData.creatorId, profileId: reputationData.profileId })

        if (previousReputation.length != 0) throw new Error("You can't leave reputation on this user because you've already given them reputation in the past.")
        if (userInfo.role == "Banned") throw new Error("Banned users cannot leave reputation.")

        const reputation = await dbContext.Reputation.create(reputationData)
        return reputation
    }

    async destroyReputation(reputationId, userInfo) {
        const reputationToDestroy = await dbContext.Reputation.findById(reputationId)

        if (!reputationToDestroy) throw new Error("Could not find reputation by id")

        if (userInfo.role == "Banned") throw new Error("Banned users may not delete reputation.")
        if (userInfo.role != "Moderator") {
            if (userInfo.id != reputationToDestroy.creatorId) throw new Forbidden("You cannot delete reputation that you did not leave.")
        }

        await reputationToDestroy.deleteOne()

        return { status: 200, message: "Deleted reputation." }
    }
}

export const reputationService = new ReputationService()