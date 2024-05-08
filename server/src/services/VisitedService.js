import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class VisitedService {

    //!SECTION - Gets visited status for users
    async getVisited(creatorId) {
        const visited = await dbContext.Visited.find({ creatorId: creatorId }).populate('park')
        return visited
    }

    async getVisitedByPark(parkId) {
        const visited = await dbContext.Visited.find({ parkId: parkId }).populate('creator', '-ip -password -email')
        return visited
    }

    async postVisited(visitedData) {
        const previous = await dbContext.Visited.find({ parkId: visitedData.parkId, creatorId: visitedData.creatorId })
        if (previous.length != 0) throw new Error('You already left a review for this park.')

        const visit = await dbContext.Visited.create(visitedData)
        await visit.populate('creator', '-ip -password -email')
        return visit
    }

    async destroyVisited(visitedId, userInfo) {
        const visited = await dbContext.Visited.findById(visitedId)
        if (!visited) throw new Error("Could not find visited by id")

        if (userInfo.role != "Moderator") {
            if (visited.creatorId != userInfo.id) throw new Forbidden("You cannot delete a review that you did not leave.")
        }

        await visited.deleteOne()
        return { status: 200, message: "Deleted visited." }
    }
}

export const visitedService = new VisitedService()