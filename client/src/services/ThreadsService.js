import { AppState } from "../AppState.js"
import { Thread } from "../models/Thread.js"
import { api } from "./AxiosService.js"


class ThreadsService{
    async searchThreads(searchQuery) {
        AppState.threads = []
        const response = await api.get(`api/threads/search?query=${searchQuery}`)
        const threads = response.data.map(threadData => new Thread(threadData))
        AppState.threads = threads
      }

      async getThreads(){
        const response = await api.get(`api/threads/:tag`)
        const threads = response.data.map(threadData => new Thread(threadData))
        AppState.threads = threads
      }

      async getSingleThread(){
        const response = await api.get(`api/threads/:threadId`)
        const thread = response.data.map(threadData => new Thread(threadData))
        AppState.threads = thread
      }

      async editThread(threadData, threadId){
        const response = await api.put(`api/threads/:threadId`, threadData)
        const thread = new Thread(response.data)
        const asThread = AppState.threads.findIndex(threadId)
        AppState.threads.splice(asThread, 1)
        AppState.threads.push(thread)
    }

    async deleteThread(threadId){
      await api.delete(`api/thread/:threadId`)
      const threadDelete = AppState.threads.findIndex(threadId)
      AppState.threads.splice(threadDelete, 1)
    }
}

export const threadsService = new ThreadsService()