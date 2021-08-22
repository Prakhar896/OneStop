const Discord = require('discord.js');
const weather = require('weather-js');



module.exports = {
    name: 'Weather',
    description:'Checks the weather for you!', 
    async execute(msg, args, Discord, bot) {
        var location = ''
        if (!args[1]) {
            location = 'Singapore, SG'
        }
        else {
            location = args.slice(1).join(' ')
        }
        weather.find({search: location, degreeType: 'C'} , function(err, weatherResult) {
            if(err) console.log(err);
            sendWeatherEmbed(msg, weatherResult)
        }
        )}
}

function sendWeatherEmbed(msg, weatherResult) {
    try {
        const embedWeather = new Discord.MessageEmbed()
            var current = weatherResult[0].current
            var location = weatherResult[0].location
            embedWeather.setTitle(`Weather for ${location.name}`)
            embedWeather.setDescription(`${weatherMoji(current.skytext)} ${current.skytext}: ${current.temperature}°C`)
            embedWeather.setColor(0x00AE86)
            embedWeather.setFooter(`Last Updated: ${current.day}, ${current.observationtime}`)
            msg.channel.send(embedWeather)
            console.log(current.imageUrl)
    } catch (err) {
        console.log('DISC, Error in sending Weather Embed: ' + err)
        msg.channel.send(`Error: Please enter the full name of country/city, for Example: "osaka, jp"`)
    }
}


function weatherMoji(skyName) {
    var weatherIcon = ''
    if (skyName.includes('Sunny') | skyName.includes('Clear')) { 
            weatherIcon = '☀️'
    }
    else if (skyName.includes('Cloudy')) {
        weatherIcon = '☁️'
    }
    else if (skyName.includes('Snow')) {
        weatherIcon = '❄️'
    }
    else if (skyName.includes('Rain')) {
        if (skyName.includes('Thunderstorm')) {
            weatherIcon = '⛈️'
        }
        else {
            weatherIcon = '🌧️'
        }
    }
    else {
        weatherIcon = '☁️'
    }
    return weatherIcon
}

