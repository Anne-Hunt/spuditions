import { Account } from "./Account.js"

export class Post {
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.creator = new Account(data.creator)
        this.body = data.body
        this.threadId = data.threadId
        this.createdAt = new Date(data.createdAt)
    }
}