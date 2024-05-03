import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { api } from "./AxiosService.js"


class ProfileService{
    async searchProfiles(searchQuery) {
        AppState.profiles = []
        const response = await api.get(`api/profiles/search?query=${searchQuery}`)
        const profiles = response.data.map(profileData => new Profile(profileData))
        AppState.profiles = profiles
      }
    
    async getProfile(){
      AppState.profiles = []
      const response = await api.get(`api/profiles/:profileId`)
      const profiles = response.data.maps(profileData => new Profile(profileData))
      AppState.profiles = profiles
    }
}

export const profileService = new ProfileService()