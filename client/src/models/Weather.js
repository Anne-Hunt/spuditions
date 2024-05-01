

export class Weather{
    constructor(data){
        this.dateTime = new Date(data.dt).getHours()
        this.main = data.weather.main
        this.description = data.weather.description
        this.windSpeed = data.wind.speed
        this.temperature = data.main.temp
        this.humidity = data.main.humidity
    }
}