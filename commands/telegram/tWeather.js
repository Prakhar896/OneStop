const { Telegraf } = require('telegraf')
const weather = require('weather-js');
const models = require('../../models');

module.exports = {
    name:'Weather',
    description:'Checks the weather for you!',
    sampleCommandUsage: '/weather <state> (leave blank for Singapore),\n for e.g: /weather Minnesota',
    execute(ctx, telegramBot) { 
        args = ctx.message.text.split(' ')
        var location = "" 
        if (!args[1]) {
            location = "Singapore, SG"
        } else {
            location = args.slice(1).join(' ')
        } 

        weather.find({search: location, degreeType: 'C'} , async function(err, weatherResult) {
            if (err) {
                console.log('TELE; Error in getting weather data: ' + err)
                await ctx.reply('Sorry, there was an issue in fetching the weather data.')
                return
            }
            var current = weatherResult[0].current
            var location = weatherResult[0].location
            var forecast = weatherResult[0].forecast
            var windDisplay = current.winddisplay
                
            var message = `Weather for ${location.name}`
            message += `\n ${current.skytext}: ${current.temperature} °C`
            message += `\n Feels like: ${current.feelslike} °C`
            message += `\n Wind: ${current.winddisplay}`
            message += `\n Humidity: ${current.humidity}%`

            await ctx.reply(models.weatherMoji(current.skytext))
            await ctx.reply(message)

            var forecastMessage = `\n\nForecast:\n`
            for (var i = 0; i < 3; i++) {
                forecastMessage += `\n${forecast[i].day} - ${models.weatherMoji(forecast[i].skytextday)}`
                forecastMessage += `\n${forecast[i].low}°C - ${forecast[i].high}°C`
            }
            await ctx.reply(forecastMessage)
        }
        )
    }
}