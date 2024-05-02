import { dbContext } from "../db/DbContext.js";
import { authService } from "../services/AuthService.js";
import { UnAuthorized } from "./Errors.js";

export class Authware {
    // @ts-ignore
    static async AuthGuard(req, res, next) {
        if (req.headers.authorization == null) next(new UnAuthorized('An invalid token was supplied.'))
        const token = await authService.validateToken(req.headers.authorization.replace('Bearer ', ''))
        if (token == false) {
            next(new UnAuthorized('An invalid token was supplied.'))
        }

        // @ts-ignore
        const user = await dbContext.Account.findById(token._id)
        // @ts-ignore
        req.userInfo = { id: token._id, role: user.role }
        next()
    }
}