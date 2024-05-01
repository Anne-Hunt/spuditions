

export class Weather{
    constructor(data){
        this.dateTime = new Date(data.list.dt).getHours()
        this.main = data.list.weather.main
        this.description = data.list.weather.description
        this.windSpeed = data.list.wind.speed
        this.temperature = data.list.main.temp
        this.humidity = data.list.main.humidity
        this.lat = data.lat
        this.long = data.lon
        this.iconId = data.list.weather.icon
        this.icon = this.WeatherIcon
    }

    get WeatherIcon(){
        return `https://openweathermap.org/img/wn/${this.iconId}@2x.png`
    }
}