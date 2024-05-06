import { visitedService } from "../services/VisitedService.js";
import { Authware } from "../utils/Authware.js";
import BaseController from "../utils/BaseController.js";



export class VisitedController extends BaseController {
    constructor() {
        super('api/visited')
        this.router
            .use(Authware.AuthGuard)
            .post('', this.postVisited)
            .delete('/:visitedId', this.destroyVisited)
    }

    async postVisited(request, response, next) {
        try {
            const reviewData = request.body
            const review = await visitedService.postVisited(reviewData)
            response.send(review)
        } catch (error) {
            next(error)
        }
    }

    async destroyVisited(request, response, next) {
        try {
            const userInfo = request.userInfo
            const result = await visitedService.destroyVisited(request.params.visitedId, userInfo)
            response.send(result)
        } catch (error) {
            next(error)
        }
    }

}