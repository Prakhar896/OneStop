const Discord = require('discord.js');
const weather = require('weather-js');

module.exports = {
    name: 'Weather',
    description:'Checks the weather for you!', 
    async execute(msg, args, Discord, bot) {
        var location = ''
        if (!args[1]) {
            location = 'Singapore'
        }
        else {
            location = args.slice(1).join(' ')
            console.log(location)

            

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
        
            
            var message = "Weather in " + location.name + ": "
            message += '\n'+current.skytext + ':  '+ current.temperature + '°C'
        
            msg.channel.send(message)
    } catch (err) {
        console.log('DISC, Error in sending Weather Embed: ' + err)
        msg.channel.send(`Error: Please enter the full name of country/city, for Example: "osaka, jp"`)
    }
}

