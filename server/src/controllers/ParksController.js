import { parksService } from "../services/ParksService.js";
import { Authware } from "../utils/Authware.js";
import BaseController from "../utils/BaseController.js";



export class ParksController extends BaseController {
  constructor() {
    super('api/parks')
    this.router
      .get('', this.getParks)
      .get('?query=:Query', this.searchParks)
      .get('/:parkId', this.getParkById)
      .use(Authware.AuthGuard)
  }


  //!SECTION - Gets all of our parks
  async getParks(request, response, next) {
    try {
      const park = await parksService.getParks()
      response.send(park)
    } catch (error) {
      next(error)
    }
  }

  //!SECTION - Gets one park by its id (aka the active park)
  async getParkById(request, response, next) {
    try {
      const parkId = request.params.parkId
      const park = await parksService.getParkById(parkId)
      response.send(park)
    } catch (error) {
      next(error)
    }
  }

  async searchParks(request, response, next) {
    try {
      const query = request.body
      const results = await parksService.searchParks(query)
    } catch (error) {
      next(error)
    }
  }
}