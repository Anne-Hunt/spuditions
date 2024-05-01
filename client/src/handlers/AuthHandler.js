import { AppState } from "../AppState"
import { router } from "../router"
import { authService } from "../services/AuthService"
import { api } from '../services/AxiosService.js'

class AuthHandler {
    constructor() {
        let hasCookie = document.cookie != ""
        if (!hasCookie) {
            AppState.hasCookie = hasCookie
            return
        }

        const token = document.cookie.split('spuditions=')[1].split(';')[0]
        console.log('ran')
        api.defaults.headers.authorization = token
        console.log('ran')
        this.fetchUserInfo()
    }

    async fetchUserInfo() {
        console.log('ran')
        try {
            await authService.fetchUserInfo()
        } catch (error) {
            console.error(error)
        }
    }

    authGuard() {
        if (!AppState.hasCookie && AppState.account == null) {
            router.push('login')
        }
    }
}

export const authHandler = new AuthHandler()