import { visitedService } from "../services/VisitedService.js";
import { Authware } from "../utils/Authware.js";
import BaseController from "../utils/BaseController.js";



export class VisitedController extends BaseController {
    constructor() {
        super('api/visited')
        this.router
            .get('', this.getVisited)
            .use(Authware.AuthGuard)
            .post('', this.postReview)
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

    async postReview(request, response, next) {
        try {
            const reviewData = request.body
            reviewData.creatorId = request.userInfo.id
            const review = await visitedService.postReview(reviewData)
        } catch (error) {
            next(error)
        }
    }

    async destroyVisited(request, response, next) {
        try {
            const result = await visitedService.destroyVisited(request.params.visitedId)
            response.send(result)
        } catch (error) {
            next(error)
        }
    }

}