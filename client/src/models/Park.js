

export class Park {
    constructor(data) {
        this.id = data._id
        this.name = data.name
        this.imgUrl = data.imgUrl
        this.webUrl = data.webUrl
        this.description = data.description
		// TODO: Split location into lat and lon
        this.location = data.location
        this.type = data.type
        this.cost = data.cost
        this.region = data.region
        this.daysClosed = data.daysClosed
        this.activities = data.activities
        this.logo = data.logo
        this.rating = data.rating
    }
}