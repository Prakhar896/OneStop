const { Telegraf } = require('telegraf')
const weather = require('weather-js');

module.exports = {
    name:'Weather',
    description:'Checks the weather for you!', 
    execute(ctx, telegramBot) { 
        args = ctx.message.text.split(' ')
        var location = "" 
        if (!args[1]) {
            location = "Singapore"
        } else {
            location = args[1] 
        } 

        weather.find({search: location, degreeType: 'C'} , function(err, weatherResult) {
            if(err) console.log(err);
            var current = weatherResult[0].current
            var location = weatherResult[0].location
            var forecast = weatherResult[0].forecast
            
                
            var message = "Weather in " + location.name + ": "
            message += '\n'+current.skytext + ':  '+ current.temperature + '°C'
            ctx.reply(message)
        }
        )
    }
}

/*/bot.on('location', (msg) => {
    console.log(msg.location.latitude);
    console.log(msg.location.longitude);
  });
/*/