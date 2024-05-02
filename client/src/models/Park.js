

export class Park {
    constructor(data) {
      this.id = data._id
      this.name = data.name
      this.imgUrl = data.imgUrl
      this.webUrl = data.webUrl
      this.description = data.description
      this.location = data.location
      this.address = data.address
      this.type = data.type
      this.costs = data.cost
      this.region = data.region
      this.daysClosed = data.daysClosed
      this.activities = data.activities
      this.logo = data.logo
      this.rating = data.rating
    }

    get GmapsLocation(){
        const dataLoc = this.location
        const latlong = dataLoc.split(' ')
        return `{lat: ${latlong[0]}, lng: ${latlong[1]}}`
    }
}