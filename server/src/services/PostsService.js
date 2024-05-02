import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class PostsService {

    //!SECTION - Creates posts by accessing the model and forming it to the data
    async createPost(postData) {
        const post = await dbContext.Post.create(postData)
        await post.populate('creator')
        return post
    }

    //!SECTION - Gets the posts on a specific thread
    async getThreadPosts(threadId) {
        const posts = await dbContext.Post.find({ threadId: threadId }).populate('creator')
        return posts
    }

    //!SECTION - Deletes posts and checks to make sure the post matches the creator
    async destroyPost(postId, userInfo) {
        const postToDelete = await dbContext.Post.findById(postId)

        if (!postToDelete) throw new Error(`No post with the id ${postId}`)
        if (userInfo.role != 'Moderator') {
            if (postToDelete.creatorId != userInfo.id) throw new Forbidden("You cannot delete posts that are not yours")
        }
        await postToDelete.deleteOne()
        return { status: 200, message: "Deleted post." }
    }
}

export const postsService = new PostsService()