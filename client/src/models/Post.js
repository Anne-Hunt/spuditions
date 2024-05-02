
export class Post {
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.body = data.body
    }
}