//Discord
const Discord = require('discord.js')
require('dotenv').config();
const discordBot = new Discord.Client();
const PREFIX = 'o!'

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
    }
})

discordBot.login(process.env.DISCORD_BOT_TOKEN)

//Telegram
const { Telegraf } = require('telegraf')
const oneStopBotToken = process.env.TELEGRAM_BOT_TOKEN

const telegramBot = new Telegraf(oneStopBotToken)

telegramBot.start((ctx) => {
    ctx.reply('Hey there! I am OneStop!')
})

telegramBot.launch()