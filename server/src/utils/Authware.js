import { authService } from "../services/AuthService.js";
import { UnAuthorized } from "./Errors.js";

export class Authware {
    static async AuthGuard(req, res, next) {
        if (req.headers.authorization == null) next(new UnAuthorized('An invalid token was supplied.'))
        const token = await authService.validateToken(req.headers.authorization.replace('Bearer ', ''))
        if (token == false) {
            next(new UnAuthorized('An invalid token was supplied.'))
        }
        // @ts-ignore
        req.userInfo = { id: token._id }
        next()
    }
}