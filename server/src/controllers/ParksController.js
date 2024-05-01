import { parksService } from "../services/ParksService.js";
import BaseController from "../utils/BaseController.js";



export class ParksController extends BaseController {
  constructor() {
    // REVIEW - Is this the correct api path?
    //FIXME - - Will need to add middleware once auth is set up
    super('api/parks')
    this.router
      .get('', this.getParks)
      .get('/:parkId', this.getParkById)
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
}