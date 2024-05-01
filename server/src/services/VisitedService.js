import { dbContext } from "../db/DbContext.js"



class VisitedService {

  //!SECTION - Gets visited status for users
  async getVisited() {
    const visited = await dbContext.Visited.find()
    return visited
  }
}

export const visitedService = new VisitedService()