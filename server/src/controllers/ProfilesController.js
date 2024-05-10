import { accountService } from '../services/AccountService.js'
import { postsService } from '../services/PostsService.js'
import { profileService } from '../services/ProfileService.js'
import { reputationService } from '../services/ReputationService.js'
import { threadsService } from '../services/ThreadsService.js'
import { visitedService } from '../services/VisitedService.js'
import { Authware } from '../utils/Authware.js'
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
            .get('/:profileId/threads', this.getThreads)
            .get('/:profileId/posts', this.getPosts)
            .use(Authware.AuthGuard)
    }

    async banProfile(request, response, next) {
        try {
            const profileId = request.params.profileId
            const profile = await accountService.banAccount(profileId)
        } catch (error) {
            next(error)
        }
    }
    async searchProfile(request, response, next) {
        try {
            const profiles = await profileService.searchProfile(request.query)
            response.send(profiles)
        } catch (error) {
            next(error)
        }
    }

    async getThreads(request, response, next) {
        try {
            const threads = await threadsService.getThreadsByProfile(request.params.profileId)
            response.send(threads)
        } catch (error) {
            next(error)
        }
    }

    async getPosts(request, response, next) {
        try {
            const posts = await postsService.getPostsByProfile(request.params.profileId)
            response.send(posts)
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
            const profile = await profileService.getProfileById(req.params.profileId)
            res.send(profile)
        } catch (error) {
            next(error)
        }
    }
}
