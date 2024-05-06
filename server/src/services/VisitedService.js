import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class VisitedService {

    //!SECTION - Gets visited status for users
    async getVisited(creatorId) {
        const visited = await dbContext.Visited.find({ creatorId: creatorId })
        return visited
    }

    async getVisitedByPark(parkId) {
        const visited = await dbContext.Visited.find({ parkId: parkId })
        return visited
    }

    async postVisited(visitedData) {
        //*FIXME - THIS MAKES MAD CRAZY ERRORS
        // const previous = await dbContext.Visited.find({ parkId: visitedData.parkId, creatorId: visitedData.creatorId })
        // if (previous) throw new Error('You already left a review for this park.')

        const visited = await dbContext.Visited.create(visitedData)
        return visited
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