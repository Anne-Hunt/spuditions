import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



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

  //!SECTION - Gets a thread by its id
  async getThreadById(threadId) {
    const thread = await dbContext.Thread.findById(threadId)
    if (!thread) throw new Error(`No thread with the id ${threadId}`)
    return thread
  }

  //!SECTION - Deletes a thread by its id
  async destroyThread(threadId, creatorId) {
    const threadToDelete = await this.getThreadById(threadId)

    if (threadToDelete.creatorId != creatorId) throw new Forbidden("You cannot delete a thread you have not created")

    await threadToDelete.deleteOne()
    return threadToDelete
  }

}

export const threadsService = new ThreadsService()