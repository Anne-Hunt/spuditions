import { postsService } from "../services/PostsService.js";
import { threadsService } from "../services/ThreadsService.js";
import { Authware } from "../utils/Authware.js";
import BaseController from "../utils/BaseController.js";



export class ThreadsController extends BaseController {
  constructor() {
    super('api/threads')
    this.router
      .get('', this.getThreads)
      .get('/:threadId/posts', this.getThreadPosts)
      .use(Authware.AuthGuard)
  }

  //!SECTION - Creates threads and attaches a creator
  async createThread(request, response, next) {
    try {
      const user = request.userInfo
      const threadData = request.body
      threadData.creatorId = user.id
      const thread = await threadsService.createThread(threadData)
      response.send(thread)
    } catch (error) {
      next(error)
    }
  }

  //!SECTION - Gets threads from the thread service 
  async getThreads(request, response, next) {
    try {
      const threads = await threadsService.getThreads()
      response.send(threads)
    } catch (error) {
      next(error)
    }
  }

  //!SECTION - Gets a thread by its id
  async getThreadById(request, response, next) {
    try {
      const threadId = request.params.threadId
      const thread = await threadsService.getThreadById(threadId)
      response.send(thread)
    } catch (error) {
      next(error)
    }
  }

  //!SECTION - Gets the posts on a particular thread
  async getThreadPosts(request, response, next) {
    try {
      const threadId = request.params.threadId
      const posts = await postsService.getThreadPosts(threadId)
      response.send(posts)
    } catch (error) {
      next(error)
    }
  }
}