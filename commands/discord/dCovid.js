const Discord = require('discord.js');

// Import any extra libraries here
const getCountryISO3 = require("country-iso-2-to-3");
const covid19 = require('owid-covid')

module.exports = {
    name: 'Covid',
    description: 'Get all the information you need regarding COVID-19 in Singapore easily.',
    execute(msg, args, Discord, discordBot) {
        // Add code here
        var location = ""
        if (!args[1]) {
            location = "SGP"
        } 
        else {
            location = args[1]
            location = location.toUpperCase()
        }
        //getting data
        if (location.length === 2) {
            location = getCountryISO3(location)
        }
            covid19.getLatestStats(location).then((data) => {
                sendCovidEmbed(msg, data)
            })
        }
    }
function sendCovidEmbed(msg, data) {
    try {
        const embedCovid = new Discord.MessageEmbed()
            .setTitle(`COVID Information on ${data.location}`)
            .setFooter(`Last Updated Data: ${data.last_updated_date}`)
            .addField('New Cases', `${data.new_cases}`)
            .addField('Total Cases', `${data.total_cases}`, true)
            .addField('Total Tests', `${data.total_tests}`)
            .addField('Total Deaths', `${data.total_deaths}`, true)
            .setColor('RANDOM');

        msg.channel.send(embedCovid)
    } catch (err) {
        console.log('DISC, Error in sending Covid Embed: ' + err)
    }
}