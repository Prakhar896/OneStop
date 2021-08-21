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
            dCovid.execute(msg, args, Discord, discordBot)
            break;
    }
})

//Telegram
const { Telegraf } = require('telegraf');
const tCovid = require('./commands/telegram/tCovid');
const dCovid = require('./commands/discord/dCovid');
const tDevinfo = require('./commands/telegram/tDevinfo');
const oneStopBotToken = process.env.TELEGRAM_BOT_TOKEN

const telegramBot = new Telegraf(oneStopBotToken)

telegramBot.start((ctx) => {
    console.log(ctx.from)
    ctx.reply('Hey there! I am OneStop!')
})

telegramBot.command('devinfo', async (ctx) => {
    if (ctx.from.id != importantIDs.telegram.ids[0] && ctx.from.id != importantIDs.telegram.ids[1]) return ctx.reply('Sorry, you are not a developer of this bot.')
    tDevinfo.execute(ctx, Telegraf, telegramBot)
})

telegramBot.command('covid', (ctx) => {
    tCovid.execute(ctx, telegramBot)
})

telegramBot.launch()

discordBot.login(process.env.DISCORD_BOT_TOKEN)