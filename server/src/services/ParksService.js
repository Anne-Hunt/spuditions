import { dbContext } from "../db/DbContext.js"
import { ParkSchema } from "../models/Park.js"
import { QueryBuilder } from "../utils/QueryBuilder.js"




class ParksService {
  async searchParks(query) {
    QueryBuilder.build(ParkSchema, query)
    const results = await dbContext.Park.find(query)
    return results
  }

  //!SECTION - Gets all of our parks
  async getParks() {
    const park = await dbContext.Park.find()
    return park
  }

  //!SECTION - Gets one park by its id (aka the active park). If it cannot find a park with given id, will return an error.
  async getParkById(parkId) {
    const park = await dbContext.Park.findById(parkId)
    if (!park) throw new Error(`Could not find a park with the id ${parkId}`)
    return park
  }
}

export const parksService = new ParksService()