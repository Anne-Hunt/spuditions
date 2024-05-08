import { dbContext } from "../db/DbContext.js"
import { PostSchema } from "../models/Post.js"
import { Forbidden } from "../utils/Errors.js"
import { QueryBuilder } from "../utils/QueryBuilder.js"



class PostsService {
    //!SECTION - searches posts from search bar - decided to remove functionality
    // async searchPosts(query) {
    //     const searchQuery = QueryBuilder.build(PostSchema, query)
    //     const posts = await dbContext.Post.find(searchQuery)
    //     return posts
    // }

    //!SECTION - Creates posts by accessing the model and forming it to the data
    async createPost(postData) {
        const post = await dbContext.Post.create(postData)
        await post.populate('creator', '-email -id -password')
        return post
    }

    //!SECTION - Gets the posts on a specific thread
    async getThreadPosts(threadId) {
        const posts = await dbContext.Post.find({ threadId: threadId }).populate('creator', '-email -id -password')
        return posts
    }
    //!SECTION - edits specific post, checks for user's ownership or moderator
    async editPost(postData, postId, user) {
        const postEdit = await dbContext.Post.findById(postId)
        if (!postEdit) throw new Error(`Unable to find post ${postId}`)
        if (user.role != 'Moderator') {
            if (postEdit.creatorId != user.id) throw new Forbidden("You shall not edit that which you have not created.")
        }
        postEdit.body = postData.body ?? postEdit.body
        await postEdit.save()
        return postEdit
    }

    //!SECTION - Deletes posts and checks to make sure the post matches the creator
    async destroyPost(postId, userInfo) {
        const postToDelete = await dbContext.Post.findById(postId)

        if (!postToDelete) throw new Error(`No post with the id ${postId}`)
        if (userInfo.role != 'Moderator') {
            if (postToDelete.creatorId != userInfo.id) throw new Forbidden("You cannot delete posts that you did not create.")
        }
        await postToDelete.deleteOne()
        return { status: 200, message: "Deleted post." }
    }
}

export const postsService = new PostsService()