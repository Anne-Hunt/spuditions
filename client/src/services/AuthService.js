import { AppState } from "../AppState"
import { Account } from "../models/Account"
import { api } from "./AxiosService"

class AuthService {
    async login(accountData) {
        const response = await api.post('account/login', accountData)
        let date = new Date(Date.now() + 1000 * response.data.expires_in).toUTCString()
        document.cookie = `spuditions=${response.data.accessToken}; Max-Age=${response.data.expires_in}; Path=/; Expires=${date};`
    }

    async fetchUserInfo() {
        const response = await api.get('account')
        AppState.account = new Account(response.data)
        AppState.user = new Account(response.data)
    }
}

export const authService = new AuthService()