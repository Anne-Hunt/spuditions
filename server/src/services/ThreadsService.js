import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class ThreadsService {

    //!SECTION - Creates a thread forming data from the thread model
    async createThread(threadData) {
        const thread = await dbContext.Thread.create(threadData)
        return thread
    }

    //!SECTION - Gets all of our threads
    async getThreads(query) {
        const threads = await dbContext.Thread.find(query)
        return threads
    }

    //!SECTION - Gets a thread by its id
    async getThreadById(threadId) {
        const thread = await dbContext.Thread.findById(threadId)
        if (!thread) throw new Error(`No thread with the id ${threadId}`)
        return thread
    }

    //!SECTION - Deletes a thread by its id
    async destroyThread(threadId, userInfo) {
        const threadToDelete = await this.getThreadById(threadId)

        if (userInfo.role != 'Moderator') {
            if (threadToDelete.creatorId != userInfo.id) throw new Forbidden("You cannot delete a thread you have not created.")
        }

        await threadToDelete.deleteOne()
        return { status: 200, message: "Deleted thread." }
    }

}

export const threadsService = new ThreadsService()