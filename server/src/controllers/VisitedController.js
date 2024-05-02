import { visitedService } from "../services/VisitedService.js";
import { Authware } from "../utils/Authware.js";
import BaseController from "../utils/BaseController.js";



export class VisitedController extends BaseController {
    constructor() {
        super('api/visited')
        this.router
            .get('', this.getVisited)
            .use(Authware.AuthGuard)
    }

    //!SECTION - Gets visited status for users
    async getVisited(request, response, next) {
        try {
            const visited = await visitedService.getVisited()
            response.send(visited)
        } catch (error) {
            next(error)
        }
    }

    async setVisited(request, response, next) {
        try {

        } catch (error) {
            next(error)
        }
    }


}