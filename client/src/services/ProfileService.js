import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { Profile } from "../models/Profile.js"
import { Reputation } from "../models/Reputation.js"
import { Thread } from "../models/Thread.js"
import { Visited } from "../models/Visited.js"
import { api } from "./AxiosService.js"


class ProfileService{
    async getVisited(profileId) {
      AppState.visited = []
      const response = await api.get(`api/profiles/${profileId}/visited`)
      const visits = response.data.map(visitData => new Visited(visitData))
      AppState.visited = visits
    }
    async getPosts(profileId) {
      AppState.posts = []
      const response = await api.get(`api/profiles/${profileId}/posts`)
      const posts = response.data.map(postData => new Post(postData))
      AppState.posts = posts
    }
    async getThreads(profileId) {
      AppState.threads = []
      const response = await api.get(`api/profiles/${profileId}/threads`)
      const threads = response.data.map(threadData => new Thread(threadData))
      AppState.threads = threads
    }
    async searchProfiles(searchQuery) {
        AppState.profiles = []
        const response = await api.get(`api/profiles/search?query=${searchQuery}`)
        const profiles = response.data.map(profileData => new Profile(profileData))
        AppState.profiles = profiles
      }
    
    async getProfile(profileId){
      AppState.activeProfile = null
      const response = await api.get(`api/profiles/${profileId}`)
      AppState.activeProfile = new Profile(response.data)
    }

    async getReputation(profileId) {
      AppState.reputation = []
      const response = await api.get(`api/profiles/${profileId}/reputation`)
      const reputations = response.data.map(repData => new Reputation(repData))
      AppState.reputation = reputations
  }
}
    
export const profileService = new ProfileService()