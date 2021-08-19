//Discord
const Discord = require('discord.js')
require('dotenv').config();
const discordBot = new Discord.Client();
const covid19 = require('owid-covid')
const PREFIX = 'o!'


// ISO2 to ISO3 conversion (Example: US to USA)
const getCountryISO3 = require("country-iso-2-to-3");
// getCountryISO3("iso2 country code")
/* Focus on data:
    data.location
    data.new_cases
    data.total_deaths
    data.total_cases
    data.total_tests
    *** data.last_updated_date ***
*/



discordBot.on('ready', () => {
    console.log('OneStop is ready to serve!')
})

discordBot.on('message', (msg) => {
    if (!msg.content.startsWith(PREFIX)) return
    let args = msg.content.substring(PREFIX.length).split(' ');
    switch (args[0]) {
        case 'info':
            msg.reply('Hey there! I am OneStop!')
            break;
        case 'covid':
            if (!args[1]) return msg.channel.send('Invalid response! Example: o!covid usa')
            args[1] = args[1].toUpperCase()
            //getting data
            if (args[1].length === 2) {
                const searchParam = getCountryISO3(args[1])
                covid19.getLatestStats(searchParam).then((data) => {
                    // newData = {
                    //     location: data.location,
                    //     new_cases: data.new_cases,
                    //     total_deaths: data.total_deaths,
                    //     total_cases: data.total_cases,
                    //     total_tests: data.total_tests,
                    //     last_updated_date: data.last_updated_date
                    // }
                    const embedCovid = new Discord.MessageEmbed()
                        .setTitle(`COVID Information on ${data.location}`)
                        .setFooter(`Last Updated Data ${data.last_updated_date}`)
                        .addField('New Cases', `${data.new_cases}`)
                        .addField('Total Cases', `${data.total_cases}`, true)
                        .addField('Total Tests', `${data.total_tests}`)
                        .addField('Total Deaths', `${data.total_deaths}`, true)
                        .setColor('RANDOM');

                    msg.channel.send(embedCovid)
                })
            } else {
                covid19.getLatestStats(args[1]).then((data) => {
                    // newData = {
                    //     location: data.location,
                    //     new_cases: data.new_cases,
                    //     total_deaths: data.total_deaths,
                    //     total_cases: data.total_cases,
                    //     total_tests: data.total_tests,
                    //     last_updated_date: data.last_updated_date
                    // }
                    const embedCovid = new Discord.MessageEmbed()
                        .setTitle(`COVID Information on ${data.location}`)
                        .setFooter(`Last Updated Data: ${data.last_updated_date}`)
                        .addField('New Cases', `${data.new_cases}`)
                        .addField('Total Cases', `${data.total_cases}`, true)
                        .addField('Total Tests', `${data.total_tests}`)
                        .addField('Total Deaths', `${data.total_deaths}`, true)
                        .setColor('RANDOM');

                    msg.channel.send(embedCovid)
                })
            }
            break;
    }
})

//Telegram
const { Telegraf } = require('telegraf')
const oneStopBotToken = process.env.TELEGRAM_BOT_TOKEN

const telegramBot = new Telegraf(oneStopBotToken)

telegramBot.start((ctx) => {
    console.log(ctx.from)
    ctx.reply('Hey there! I am OneStop!')
})

telegramBot.on('sticker', (ctx) => {
    ctx.reply('👌🏻')
})

telegramBot.command('devinfo', async (ctx) => {
    if (ctx.from.id != 1622650771 && ctx.from.id != 1604074166) return ctx.reply('Sorry, you are not a developer of this bot.')
    try {
        await ctx.reply(`id: ${telegramBot.botInfo.id}`)
        await ctx.reply(`first_name: ${telegramBot.botInfo.first_name}`)
        await ctx.reply(`can_read_all_group_messages: ${telegramBot.botInfo.can_read_all_group_messages}`)
        await ctx.reply(`can_join_groups: ${telegramBot.botInfo.can_join_groups}`)
        await ctx.reply(`supports_inline_queries: ${telegramBot.botInfo.supports_inline_queries}`)
        await ctx.reply(`username: ${telegramBot.botInfo.username}`)
        await ctx.reply(`is_bot: ${telegramBot.botInfo.is_bot}`)
    } catch (err) {
        console.log(err)
    }
})

telegramBot.command('covid', (ctx) => {
    covid19.getLatestStats('SGP')
    .then(async data => {
        await ctx.reply(`New Cases: ${data.new_cases}`)
        await ctx.reply(`Total Cases: ${data.total_cases}`)
        await ctx.reply(`Total Deaths: ${data.total_deaths}`)
        await ctx.reply(`Total Vaccinations: ${data.total_vaccinations}`)
        // console.log(data)
    })
})

telegramBot.launch()

discordBot.login(process.env.DISCORD_BOT_TOKEN)