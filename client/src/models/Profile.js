export class Profile {
    constructor(data) {
        this.id = data.id
        this.email = data.email
        this.name = data.name
        this.picture = data.picture
        this.role = data.role // Banned, Member, Moderator

        this.threadCount = data.threadCount
        this.reputation = data.reputation
        this.postCount = data.postCount
    }
}