import { Account } from "./Account.js"

export class Thread {
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.creator = data.creator ? new Account(data.creator) : null
        this.title = data.title
        this.body = data.body
        this.tags = data.tags
        this.section = data.section
    }
}