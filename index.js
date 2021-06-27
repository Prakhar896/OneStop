//Discord
const Discord = require('discord.js')
require('dotenv').config();
const discordBot = new Discord.Client();
const covid19 = require('owid-covid')
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
//wait lemme switch to something else
discordBot.login(process.env.DISCORD_BOT_TOKEN)

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
    .then(data => {
        console.log(data)
    })
})

telegramBot.launch()