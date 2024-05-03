import { dbContext } from '../db/DbContext.js'
import { AccountSchema } from '../models/Account.js'
import { QueryBuilder } from '../utils/QueryBuilder.js'

// IMPORTANT profiles should not be updated or modified in any way here. Use the AccountService

class ProfileService {
    /**
      * Returns a user profile from its id
      * @param {string} id
     */
    async getProfileById(id) {
        const profile = await dbContext.Account.findById(id, '-password -ip')
        return profile
    }

    async searchProfile(searchQuery) {
        const query = QueryBuilder.build(AccountSchema, searchQuery)
        const profiles = await dbContext.Account.find(query, '-password -ip')

        return profiles
    }

    /**
      * Returns a list user profiles from a query search of name likeness
      * limits to first 20 without offset
      * @param {string} name
     */
    async findProfiles(name = '', offset = 0) {
        const filter = new RegExp(name, 'ig')
        return await dbContext.Account
            .aggregate([{
                $match: { name: filter }
            }])
            .collation({ locale: 'en_US', strength: 1 })
            .skip(Number(offset))
            .limit(20)
            .exec()
    }
}

export const profileService = new ProfileService()
