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

        AppState.hasCookie = hasCookie
        const token = document.cookie.split('spuditions=')[1].split(';')[0]
        api.defaults.headers.authorization = token
        this.fetchUserInfo() // handle this on new login

    }

    async fetchUserInfo() {
        try {
            await authService.fetchUserInfo()
        } catch (error) {
            console.error(error) // Clear cookie
        }
    }

    authGuard() {
        if (!AppState.hasCookie && AppState.account == null) {
            router.push('login')
        }
    }
}

export const authHandler = new AuthHandler()