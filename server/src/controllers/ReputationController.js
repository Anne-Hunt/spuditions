import { reputationService } from "../services/ReputationService.js";
import { Authware } from "../utils/Authware.js";
import BaseController from "../utils/BaseController.js";

export class ReputationController extends BaseController {
    constructor() {
        super('api/reputation')
        this.router
            .use(Authware.AuthGuard)
            .post('', this.postReputation)
            .put('/:reputationId', this.editReputation)
            .delete('/:reputationId', this.destroyReputation)
    }

    async destroyReputation(request, response, next) {
        try {
            const result = await reputationService.destroyReputation(request.params.reputationId, request.userInfo)
            response.send(result)
        } catch (error) {
            next(error)
        }
    }

    async postReputation(request, response, next) {
        try {
            const reputationData = request.body
            const user = request.userInfo
            const creatorId = user.id
            const reputation = await reputationService.postReputation(reputationData, creatorId, user)
            response.send(reputation)
        } catch (error) {
            next(error)
        }
    }

    async editReputation(request, response, next) {
        try {
            const reputationData = {}
            reputationData.amount = request.body.amount
            reputationData.body = request.body.body
            const reputation = await reputationService.editReputation(request.params.reputationId, request.userInfo, reputationData)
            response.send(reputation)
        } catch (error) {
            next(error)
        }
    }
}