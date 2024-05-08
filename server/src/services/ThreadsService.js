import { dbContext } from "../db/DbContext.js"
import { ThreadSchema } from "../models/Thread.js"
import { Forbidden } from "../utils/Errors.js"
import { QueryBuilder } from "../utils/QueryBuilder.js"



class ThreadsService {
    async searchThreads(query) {
        const searchQuery = QueryBuilder.build(ThreadSchema, query)
        const threads = await dbContext.Thread.find(searchQuery)
        return threads
    }

    //!SECTION - Creates a thread forming data from the thread model
    async createThread(threadData) {
        const thread = await dbContext.Thread.create(threadData)
        return thread
    }

    //!SECTION - Gets all of our threads
    async getThreads(query) {
        const threads = await dbContext.Thread.find(query).populate('creator', '-email -id -password')
        return threads
    }

    //!SECTION - Gets a thread by its id
    async getThreadById(threadId) {
        const thread = await dbContext.Thread.findById(threadId)
        await thread.populate('creator', '-email -id -password')
        if (!thread) throw new Error(`No thread with the id ${threadId}`)
        return thread
    }

    //!SECTION - Deletes a thread by its id
    async destroyThread(threadId, userInfo) {
        const threadToDelete = await this.getThreadById(threadId)

        if (userInfo.role != 'Moderator') {
            if (threadToDelete.creatorId != userInfo.id) throw new Forbidden("You cannot delete a thread that you have not created.")
        }

        await threadToDelete.deleteOne()
        return { status: 200, message: "Deleted thread." }
    }

}

export const threadsService = new ThreadsService()