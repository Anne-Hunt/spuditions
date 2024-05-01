import { Authware } from "../utils/Authware.js";
import BaseController from "../utils/BaseController.js";



export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .use(Authware.AuthGuard)
  }

  async getPostsByThread(request, reponse, next) {
    try {

    } catch (error) {
      next(error)
    }
  }
}