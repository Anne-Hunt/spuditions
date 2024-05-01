import { authService } from "../services/AuthService.js";
import { UnAuthorized } from "./Errors.js";

export class Authware {
    static async AuthGuard(req, res, next) {
        if (!await authService.validateToken(req.headers.authorization.replace('Bearer ', ''))) {
            next(new UnAuthorized('An invalid token was supplied.'))
        }
        next()
    }
}