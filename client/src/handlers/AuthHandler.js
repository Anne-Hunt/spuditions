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
        this.fetchUserInfo()
    }

    async fetchUserInfo() {
        try {
            await authService.fetchUserInfo()
        } catch (error) {
            let date = new Date(0)
            document.cookie = `spuditions=logout; Max-Age=0; Path=/; Expires=${date};`
            AppState.hasCookie = false
            AppState.account = null
            AppState.user = null
            api.defaults.headers.authorization = ""
        }
    }

    authGuard() {
        if (!AppState.hasCookie && AppState.account == null) {
            router.push('login')
        }
    }
}

export const authHandler = new AuthHandler()