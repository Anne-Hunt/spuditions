import { Authware } from "../utils/Authware.js";
import BaseController from "../utils/BaseController.js";

export class ReputationController extends BaseController {
    constructor() {
        super('api/reputation')
        this.router
            .use(Authware.AuthGuard)
            .post('')
            .put('/:reputationId')
            .delete('/:reputationId')
    }
}