

export class Weather{
    constructor(data){
        this.dateTime = new Date(data.list.dt).getHours()
        this.dateDay = new Date (data.list.dt).getDay()
        this.main = data.list.weather.main
        this.description = data.list.weather.description
        this.windSpeed = data.list.wind.speed
        this.temperature = data.list.main.temp
        this.humidity = data.list.main.humidity
        this.lat = data.lat
        this.long = data.lon
        this.iconId = data.list.weather.icon
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