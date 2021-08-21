const Discord = require('discord.js');
const { Telegraf } = require('telegraf')

// Import any extra libraries here
const getCountryISO3 = require("country-iso-2-to-3");
const covid19 = require('owid-covid')

module.exports = {
    name: 'Covid',
    description: 'Get all the information you need regarding COVID-19 in Singapore easily.',
    async execute(msg, args, Discord, bot) {
        // Add code here
        if (!args[1]) return msg.channel.send('Invalid response! Example: o!covid usa')
        args[1] = args[1].toUpperCase()
        //getting data
        if (args[1].length === 2) {
            const searchParam = getCountryISO3(args[1])
            covid19.getLatestStats(searchParam).then((data) => {
                sendCovidEmbed(msg, data)
            })
        } else {
            covid19.getLatestStats(args[1]).then((data) => {
                sendCovidEmbed(msg, data)
            })
        }
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