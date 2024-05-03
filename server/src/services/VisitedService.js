import { dbContext } from "../db/DbContext.js"



class VisitedService {

    //!SECTION - Gets visited status for users
    async getVisited() {
        const visited = await dbContext.Visited.find()
        return visited
    }

    async postReview(visitedData) {
        const visited = await dbContext.Visited.create(visitedData)
        return visited
    }

    async destroyVisited(visitedId) {

    }
}

export const visitedService = new VisitedService()