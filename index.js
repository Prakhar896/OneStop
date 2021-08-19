//Discord
const Discord = require('discord.js')
require('dotenv').config();
const discordBot = new Discord.Client();
const covid19 = require('owid-covid')
const PREFIX = process.env.PREFIX



// ISO2 to ISO3 conversion (Example: US to USA)
const getCountryISO3 = require("country-iso-2-to-3");

const importantIDs = {
    "telegram": {
        "ids": [1622650771, 1604074166]
    },
    "discord": {
        "ids": ['662496683451613204', '445816983951507458']
    },
    "teleDevChatID": -508259535,
    "discordDevBackendServer": {
        "serverID": "857942746647101466",
        "generalID": "857942746647101469",
        "testingChannel1ID": "858574777378537482",
        "testingChannel2ID": "858619285696938004"
    }
}

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
        case 'settings':
            if (!args[1]) return msg.channel.send('Invalid response! Example: o!settings <key> <value>')
            args[1] = args[1].toLowerCase() // toLowerCase for settings keys

    }
})

//Telegram
const { Telegraf } = require('telegraf');
const covid = require('./commands/telegram/covid');
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
    if (ctx.from.id != importantIDs.telegram.ids[0] && ctx.from.id != importantIDs.telegram.ids[1]) return ctx.reply('Sorry, you are not a developer of this bot.')
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
    covid.execute(ctx, telegramBot)
})

telegramBot.launch()

discordBot.login(process.env.DISCORD_BOT_TOKEN)