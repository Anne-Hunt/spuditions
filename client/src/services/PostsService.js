import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"


class PostsService{
    async searchPosts(searchQuery) {
        AppState.posts = []
        const response = await api.get(`api/posts/search?query=${searchQuery}`)
        const posts = response.data.map(postData => new Post(postData))
        AppState.posts = posts
      }

      async getPosts(){
        AppState.posts = []
        const response = await api.get(`api/posts/:threadId`)
        const posts = response.data.map(postData => new Post(postData))
        AppState.posts = posts
      }

      async getPostsByUser(){
        AppState.posts = []
        const response = await api.get(`api/profile/:profileId`)
        const posts = response.data.map(postData => new Post(postData))
        AppState.posts = posts
      }
}

export const postsService = new PostsService()