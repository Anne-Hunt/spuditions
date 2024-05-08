import { profileService } from '../services/ProfileService.js'
import { reputationService } from '../services/ReputationService.js'
import { visitedService } from '../services/VisitedService.js'
import BaseController from '../utils/BaseController'

export class ProfilesController extends BaseController {
    constructor() {
        super('api/profiles')
        this.router
            .get('', this.getProfiles)
            .get('/search', this.searchProfile)
            .get('/:profileId', this.getProfile)
            .get('/:profileId/reputation', this.getReputationOnProfile)
            .get('/:profileId/visited', this.getVisited)
    }

    async searchProfile(request, response, next) {
        try {
            const profiles = await profileService.searchProfile(request.query)
            response.send(profiles)
        } catch (error) {
            next(error)
        }
    }

    async getVisited(request, response, next) {
        try {
            const visited = await visitedService.getVisited(request.params.profileId)
            response.send(visited)
        } catch (error) {
            next(error)
        }
    }

    async getReputationOnProfile(request, response, next) {
        try {
            const reputation = await reputationService.getReputationOnProfile(request.params.profileId)
            response.send(reputation)
        } catch (error) {
            next(error)
        }
    }

    async getProfiles(req, res, next) {
        try {
            const profiles = await profileService.findProfiles(req.query.name)
            res.send(profiles)
        } catch (error) {
            next(error)
        }
    }

    async getProfile(req, res, next) {
        try {
            const profile = await profileService.getProfileById(req.params.id)
            res.send(profile)
        } catch (error) {
            next(error)
        }
    }
}
