import mongoose from 'mongoose'
import { dbContext } from '../db/DbContext.js'
import { AccountSchema } from '../models/Account.js'
import { QueryBuilder } from '../utils/QueryBuilder.js'
class ProfileService {
    async getProfileById(id) {
        const profile = await dbContext.Account.findById(id, '-email -password -ip')

        await profile.populate('threadCount')
        await profile.populate('postCount')

        let result = JSON.parse(JSON.stringify(profile))
        const reputation = await dbContext.Reputation.aggregate([
            { $match: { receiverId: new mongoose.Types.ObjectId(id) } },
            {
                $group:
                {
                    _id: null,
                    score: { $sum: "$amount" }
                }
            }
        ])

        result.reputation = reputation.length > 0 ? reputation[0].score : 0

        return result
    }

    async searchProfile(searchQuery) {
        const query = QueryBuilder.build(AccountSchema, searchQuery)

        const profiles = await dbContext.Account.find(query, '-email -password -ip')

        return profiles
    }

    async findProfiles(query) {
        const profiles = await dbContext.Account.find(query, '-email -password -ip')
        return profiles
    }
}

export const profileService = new ProfileService()
