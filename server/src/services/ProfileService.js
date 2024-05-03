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
        //return query
        const profiles = await dbContext.Account.find(query, '-password -ip')

        return profiles
    }

    /**
      * Returns a list user profiles from a query search of name likeness
      * limits to first 20 without offset
     */
    async findProfiles(query) {
        const profiles = await dbContext.Account.find(query, '-password -ip')
        return profiles
    }
}

export const profileService = new ProfileService()
