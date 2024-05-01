

export class Weather{
    constructor(data){
        this.dt = data.dt
        this.date = new Date(data.dt * 1000)
        this.main = data.weather.main
        this.description = data.weather.description
        this.windSpeed = data.wind.speed
        this.temperature = data.main.temp
        this.humidity = data.main.humidity
        this.lat = data.lat
        this.long = data.lon
        this.iconId = data.weather[0].icon
        this.icon = this.WeatherIcon
        this.celcius = this.Celcius
        this.fahrenheit = this.Fahrenheit
    }

    get WeatherIcon(){
        return `https://openweathermap.org/img/wn/${this.iconId}@2x.png`
    }

    get Celcius() {
        let temp = this.temperature - 273.15
        let celciusTemp = Math.floor(temp)
        return celciusTemp
    }

    get Fahrenheit() {
        let celciusTemp = this.temperature - 273.15
        let temp = Math.floor((celciusTemp * (9 / 5)) + 32)
        return temp
    }
}