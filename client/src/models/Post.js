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

    get createdAtFormatted() {
        return this.formatDatetoRelative(this.createdAt)
    }

    formatDatetoRelative(datee) {
        let current = new Date().getTime()
        let date = datee.getTime()
        let elapsed = current - date

        let msSecond = 1000
        let msMinute = msSecond * 60
        let msHour = msMinute * 60
        let msDay = msHour * 24
        let msMonth = msDay * 30

        if (elapsed < msMinute) {
            let x = Math.round(elapsed / msSecond)
            return `${x}s ago`
        } else if (elapsed < msHour) {
            let x = Math.round(elapsed / msMinute)
            return `${x}m ago`
        } else if (elapsed < msDay) {
            let x = Math.round(elapsed / msHour)
            return `${x}h ago`
        } else if (elapsed < msMonth) {
            let x = Math.round(elapsed / msDay)
            return `${x}d ago`
        } else {
            return datee.toLocaleDateString()
        }
    }
}