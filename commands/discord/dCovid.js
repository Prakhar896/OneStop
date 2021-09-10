const Discord = require('discord.js');
const { getCode, getName } = require('country-list');
// Import any extra libraries here
const getCountryISO3 = require("country-iso-2-to-3");
const covid19 = require('owid-covid')
const axios = require('axios');
const sgp_url = process.env.MOH_URL

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
        } else if (location.length > 3) {
            location = getCode(location)
            location = getCountryISO3(location)
        }


        try {
            //if location is sgp then use function covidEmbedSGP
            if (location === "SGP") {
                covidEmbedSGP(msg, Discord, discordBot)
            } else {
                covid19.getLatestStats(location).then((data) => {
                    sendCovidEmbed(msg, data)
                })
            }
        }
        catch (err) {
            msg.channel.send(err)
            console.log(err)
        }
    }
}
function sendCovidEmbed(msg, data) {
    try {
        const embedCovid = new Discord.MessageEmbed()
            .setTitle(`🦠 COVID Information on ${data.location} 🌡️`)
            .setFooter(`Last Updated Data: ${data.last_updated_date}`)
            .addField('New Cases', `${data.new_cases}`)
            .addField('Total Cases', `${data.total_cases}`, true)
            .addField('Total Tests', `${data.total_tests}`)
            .addField('Total Deaths', `${data.total_deaths}`, true)
            .setColor('RANDOM');

        msg.channel.send(embedCovid)
    } catch (err) {
        console.log('DISC, Error in sending Covid Embed: ' + err)
        msg.channel.send(err)
    }
}

// Custom method to get our stats, can't be shown publicly for now. 

function covidEmbedSGP(msg) {
    try {
        const embedCovid = new Discord.MessageEmbed()
            .setTitle(`Fetching data...`)
            .setColor('RANDOM')
        msg.channel.send(embedCovid).then(msg => {
            axios({
                method: 'get',
                url: sgp_url,
                responseType: 'json'
            })
                .then(function (response) {
                    const data = response.data
                    const embedCovid = new Discord.MessageEmbed()
                        .setTitle(`COVID Information on Singapore 🇸🇬`)
                        .setDescription(`Taken from [@mothershipSG](https://twitter.com/mothershipSG)`)
                        .setFooter(`Preliminary: ${data.preliminary} (Confirmed cases are typically released at 11pm)`)
                        .addField('Locally Transmitted Cases', `${data.local_cases}`)
                        .addField('Imported Cases', `${data.imported_cases}`, true)
                        .addField('% of population fully vaccinated', `${data.vax_stats}% 🎉`)
                        .setColor('RANDOM');
                    msg.edit(embedCovid)
                })
        })
    } catch (err) {
        msg.edit("Error in fetching data" + err)
    }
}

