import * as jwt from 'jsonwebtoken';
import { promises as fs } from 'fs';
import { dbContext } from '../db/DbContext.js';
import * as argon2 from 'argon2'
import { UnAuthorized } from '../utils/Errors.js';

class AuthService {
    async validatePassword(id, password) {
        const user = await dbContext.Account.findById(id)
        if (!user) throw new Error('Invalid login. The supplied email or password was incorrect.')

        if (await argon2.verify(user.password, password, { secret: Buffer.from(process.env.ARGON2_KEY) })) {
            return this.generateToken(user.id)
        } else {
            throw new Error('Invalid login. The supplied email or password was incorrect.')
        }
    }

    async validateToken(token) {
        //const key = await fs.readFile('./jwtRS256.key')
        const key = atob(process.env.JWTRS256)
        try {
            return await jwt.verify(token, key)
        } catch (error) {
            return false
        }
    }

    async generateToken(id) {
        const user = await dbContext.Account.findById(id)
        if (!user) throw new Error('Could not find user with ID.')

        //const key = await fs.readFile('./jwtRS256.key')
        const key = atob(process.env.JWTRS256)
        const token = jwt.sign({ _id: user.id }, key, { algorithm: 'RS256', expiresIn: '1d', issuer: "Spuditions" })
        return token

    }

}

export const authService = new AuthService()