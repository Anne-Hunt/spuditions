import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { authService } from '../services/AuthService.js'
import { accountService } from '../services/AccountService.js'
import * as dotenv from 'dotenv'
import { dbContext } from '../db/DbContext.js'
import { Authware } from '../utils/Authware.js'

export class AccountController extends BaseController {
    constructor() {
        super('account')
        this.router
            .post('/register', this.register)
            .post('/login', this.login)
            .use(Authware.AuthGuard)
            .get('', this.fetchUserInfo)
    }

    async fetchUserInfo(request, response, next) {
        try {
            const account = await accountService.fetchUserInfo(request.userInfo.id)
            response.send(account)
        }
        catch (error) {
            next(error)
        }
    }

    async login(request, response, next) {
        try {
            const token = await accountService.login(request.body)
            response.send(token)
        } catch (error) {
            next(error)
        }
    }

    async register(request, response, next) {
        try {
            request.body.ip = request.ip
            const account = await accountService.register(request.body)
            response.send(account)
        } catch (error) {
            next(error)
        }
    }

}
