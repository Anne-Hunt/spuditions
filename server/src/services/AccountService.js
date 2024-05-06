import { dbContext } from '../db/DbContext'
import * as argon2 from 'argon2'
import { authService } from './AuthService.js'

// Private Methods

/**
 * Creates account if one does not exist
 * @param {any} account
 * @param {any} user
 */
async function createAccountIfNeeded(account, user) {
    if (!account) {
        user._id = user.id
        if (typeof user.name == 'string' && user.name.includes('@')) {
            user.name = user.nickname
        }
        account = await dbContext.Account.create({
            ...user,
            subs: [user.sub]
        })
    }
    return account
}

/**
 * Adds sub to account if not already on account
 * @param {any} account
 * @param {any} user
 */
async function mergeSubsIfNeeded(account, user) {
    if (!account.subs.includes(user.sub)) {
        // @ts-ignore
        account.subs.push(user.sub)
        await account.save()
    }
}
/**
 * Restricts changes to the body of the account object
 * @param {any} body
 */
function sanitizeBody(body) {
    const writable = {
        name: body.name,
        picture: body.picture
    }
    return writable
}

class AccountService {

    async editAccount(userInfo, accountData) {
        const account = await dbContext.Account.findById(userInfo.id, '-password -ip')
        if (!account) throw new Error("Invalid session")

        account.name = accountData.name ?? account.name
        account.picture = accountData.picture ?? account.picture

        await account.save()
        return account
    }

    async fetchUserInfo(id) {
        const account = await dbContext.Account.findById(id, '-password -ip')
        if (!account) throw new Error('Invalid session')
        return account
    }

    async login(accountData) {
        const user = await dbContext.Account.findOne({ email: accountData.email })
        if (!user) throw new Error('Invalid login. The supplied email or password was incorrect.')
        if (user.role == "Banned") throw new Error("You have been banned from Spuditions.")

        const token = await authService.validatePassword(user.id, accountData.password)
        return { accessToken: token, expires_in: 86400, token_type: 'Bearer' }
    }
    async register(accountDataTemp) {
        let accountData = {
            email: accountDataTemp.email,
            name: accountDataTemp.name,
            picture: accountDataTemp.picture,
            password: accountDataTemp.password,
            ip: accountDataTemp.ip,
            role: 'Member'
        }

        const users = await dbContext.Account.find({ ip: accountData.ip, role: 'Banned' })
        if (users.length != 0) throw new Error('You cannot create another account if you have been banned before.')

        if (!accountData.password) throw new Error('A password is required to register an account.')

        // REVIEW Validation must be done here and not in model because we want the plaintext to be checked not the hashed version.
        let regex = /^[a-zA-Z0-9{\[\]}<>,.|:;`~!?@#$£%^&*()_\\\-=+'"/]{8,75}$/
        if (!regex.test(accountData.password)) {
            let regex2 = /^[a-zA-Z0-9{\[\]}<>,.|:;`~!?@#$£%^&*()_\\\-=+'"/]{1,}$/
            if (regex2.test(accountData.password)) {
                throw new Error('Password must be between 8 and 75 characters.')
            } else {
                throw new Error('Password contains an unsupported character. Passwords may only contain alphanumeric and select symbols.')
            }
        }

        accountData.password = await argon2.hash(accountData.password, { secret: Buffer.from(process.env.ARGON2_KEY) })

        const user = await dbContext.Account.create(accountData)
        return user
    }
    /**
     * Returns a user account from the Auth0 user object
     *
     * Creates user if none exists
     *
     * Adds sub of Auth0 account to account if not currently on account
     * @param {any} user
     */
    async getAccount(user) {
        console.log('getRan')
        let account = await dbContext.Account.findOne({
            _id: user.id
        })
        account = await createAccountIfNeeded(account, user)
        await mergeSubsIfNeeded(account, user)
        return account
    }

    /**
     * Updates account with the request body, will only allow changes to editable fields
     *  @param {any} user Auth0 user object
     *  @param {any} body Updates to apply to user object
     */
    async updateAccount(user, body) {
        console.log('updateRan')
        const update = sanitizeBody(body)
        const account = await dbContext.Account.findOneAndUpdate(
            { _id: user.id },
            { $set: update },
            { runValidators: true, setDefaultsOnInsert: true, new: true }
        )
        return account
    }
}
export const accountService = new AccountService()
