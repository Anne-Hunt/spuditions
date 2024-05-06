export class Profile {
    constructor(data) {
        this.id = data.id
        this.email = data.email
        this.name = data.name
        this.picture = data.picture
        this.role = data.role // Banned, Member, Moderator

        this.threadCount = data.threadCount || 0
        this.reputation = data.reputation || 0
        this.postCount = data.postCount || 0
    }
}