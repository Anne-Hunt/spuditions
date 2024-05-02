import { AppState } from "../AppState.js"
import { Thread } from "../models/Thread.js"
import { api } from "./AxiosService.js"


class ThreadsService{
    async searchThreads(searchQuery) {
        AppState.threads = []
        const response = await api.get(`api/threads?query=${searchQuery}`)
        const threads = response.data.map(threadData => new Thread(threadData))
        AppState.threads = threads
      }


}

export const threadsService = new ThreadsService()