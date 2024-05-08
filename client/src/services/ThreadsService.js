import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { Thread } from "../models/Thread.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"


class ThreadsService{

  async getPostByThreadId(threadId) {
    const response = await api.get(`api/threads/${threadId}/posts`)
    logger.log("Got posts on this thread", response.data)
    const posts = response.data.map(postData => new Post(postData))
    AppState.posts = posts
  }
  
  async createThread(threadData) {
    const response = await api.post('api/threads', threadData)
    logger.log("Creating a thread", response.data)
    const thread = new Thread(response.data)
    AppState.threads.unshift(thread)
    AppState.activeThread = thread
  }
  async getThreads(){
    const response = await api.get('api/threads')
    logger.log("Got threads", response.data)
    const threads = response.data.map(threadData => new Thread(threadData))
    AppState.threads = threads
  }
  async getThreadById(threadId) {
    const response = await api.get(`api/threads/${threadId}`)
    logger.log("Got thread by id", response.data)
    const thread = new Thread(response.data)
    AppState.activeThread = thread
  }
  async searchThreads(searchQuery) {
    AppState.threads = []
    const response = await api.get(`api/threads/search?query=${searchQuery}`)
    const threads = response.data.map(threadData => new Thread(threadData))
    AppState.threads = threads
  }
      
  async destroyThread(threadId){
      const response = await api.delete(`api/threads/${threadId}`)
      logger.log("Deleted thread", response.data)
      const threadToDelete = AppState.threads.findIndex(thread => thread.id == threadId)
      Pop.success("Deleted thread")
      AppState.threads.splice(threadToDelete, 1)
  }
  
    // async editThread(threadData, threadId){
    //     const response = await api.put(`api/threads/:threadId`, threadData)
    //     const thread = new Thread(response.data)
    //     const asThread = AppState.threads.findIndex(threadId)
    //     AppState.threads.splice(asThread, 1)
    //     AppState.threads.push(thread)
    //     AppState.activeThread = thread
    // }
      
      
}
      export const threadsService = new ThreadsService()