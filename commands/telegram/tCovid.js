const { Telegraf } = require('telegraf')
const covid19 = require('owid-covid')

const getCountryISO3 = require("country-iso-2-to-3");

module.exports = {
    name: 'Covid',
    description: 'Get all the information you need regarding COVID-19 in Singapore easily.',
    async execute(ctx, telegramBot) {
        args = ctx.message.text.split(' ')
        var location = ""
        if (!args[1]) {
            location = "SGP"
        }
        else {
            location = args[1]
            location = location.toUpperCase()
        }
        if (location.length === 2) {
            location = getCountryISO3(location)
        } else {
            await ctx.reply('Sorry, only two letter country codes are accepted. Visit here for accepted country codes: https://github.com/sujalgoel/owid-covid/blob/master/json/countries.json#L455')
            return
        }
        covid19.getLatestStats(location)
            .then(async data => {
                msg = ""
                msg += `COVID Information on ${data.location}\n`
                msg += `\nNew Cases: ${data.new_cases}`
                msg += `\nTotal Cases: ${data.total_cases}`
                msg += `\nTotal Tests: ${data.total_tests}`
                msg += `\nTotal Deaths: ${data.total_deaths}`
                msg += `\nTotal Vaccinations: ${data.total_vaccinations}`
                msg += `\nFully Vaccinated: ${data.people_fully_vaccinated}`

                await ctx.replyWithPhoto('https://www.fda.gov/files/covid19-1600x900.jpg')
                await ctx.reply(msg)
                await ctx.reply(`Last Updated Date: ${data.last_updated_date}`)
            })
            .catch(async err => {
                console.log('TEL; Error in sending getting covid stats: ' + err)
                await ctx.reply('Sorry, I was unable to fetch the Covid-19 Statistics.')
            })
    }
}