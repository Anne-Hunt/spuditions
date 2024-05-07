import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService{
    async createPost(postData) {
        const userId = AppState.account.id
        postData.creatorId = userId
        postData.threadId = AppState.activeThread.id
        const response = await api.post('api/posts', postData)
        logger.log("Created a post", response.data)
        const post = new Post(response.data)
        AppState.posts.unshift(post)
      }
    async searchPosts(searchQuery) {
        AppState.posts = []
        const response = await api.get(`api/posts/search?query=${searchQuery}`)
        const posts = response.data.map(postData => new Post(postData))
        AppState.posts = posts
      }
      
      async getPostByThreadId(threadId) {
        const response = await api.get(`api/threads/${threadId}/posts`)
        logger.log("Got posts on this thread", response.data)
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