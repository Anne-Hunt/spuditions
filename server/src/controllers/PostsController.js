import { postsService } from "../services/PostsService.js";
import { Authware } from "../utils/Authware.js";
import BaseController from "../utils/BaseController.js";



export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .use(Authware.AuthGuard)
      .post('', this.createPost)
      .delete('/:postId', this.destroyPost)
  }

  //!SECTION - Creates posts, defines the user id & post data

  async createPost(request, response, next) {
    try {
      const user = request.userInfo
      const postData = request.body
      postData.creatorId = user.id
      const post = await postsService.createPost(postData)
      response.send(post)
    } catch (error) {
      next(error)
    }
  }

  //!SECTION - Deletes a post and defines the postId & user.id
  async destroyPost(request, response, next) {
    try {
      const postId = request.params.postId
      const user = request.userInfo
      const message = await postsService.destroyPost(postId, user.id)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}