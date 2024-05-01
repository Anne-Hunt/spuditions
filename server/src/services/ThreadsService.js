import { dbContext } from "../db/DbContext.js"



class ThreadsService {

  //!SECTION - Creates a thread forming data from the thread model
  async createThread(threadData) {
    const thread = await dbContext.Thread.create(threadData)
    return thread
  }

  //!SECTION - Gets all of our threads
  async getThreads() {
    const threads = await dbContext.Thread.find()
    return threads
  }



}

export const threadsService = new ThreadsService()