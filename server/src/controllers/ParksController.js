import { parksService } from "../services/ParksService.js";
import { visitedService } from "../services/VisitedService.js";
import { Authware } from "../utils/Authware.js";
import BaseController from "../utils/BaseController.js";



export class ParksController extends BaseController {
    constructor() {
        super('api/parks')
        this.router
            .get('', this.getParks)
            .get('?query=:Query', this.searchParks)
            .get('/:parkId', this.getParkById)
            .get('/:parkId/visited', this.getVisitedByPark)
            .use(Authware.AuthGuard)
    }

    async getVisitedByPark(request, response, next) {
        try {
            const visited = await visitedService.getVisitedByPark(request.params.parkId)
        } catch (error) {
            next(error)
        }
    }
}
  //!SECTION - searches parks and returns potential matches
  async searchParks(request, response, next) {
    try {
        const query = request.body
        const results = await parksService.searchParks(query)
        response.send(results)
    } catch (error) {
        next(error)
    }
}