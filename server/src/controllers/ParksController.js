import { parksService } from "../services/ParksService.js";
import { visitedService } from "../services/VisitedService.js";
import { Authware } from "../utils/Authware.js";
import BaseController from "../utils/BaseController.js";



export class ParksController extends BaseController {
    constructor() {
        super('api/parks')
        this.router
            .get('', this.getParks)
            .get('/search', this.searchParks)
            .get('/:parkId/visited', this.getVisitedByPark)
            .get('/:parkId', this.getParkById)
            .use(Authware.AuthGuard)
    }

    async getVisitedByPark(request, response, next) {
        try {
            const visited = await visitedService.getVisitedByPark(request.params.parkId)
            response.send(visited)
        } catch (error) {
            next(error)
        }
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
            const query = request.query
            const results = await parksService.searchParks(query)
            response.send(results)
        } catch (error) {
            next(error)
        }
    }
}