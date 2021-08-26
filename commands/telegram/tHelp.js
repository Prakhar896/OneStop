const Discord = require('discord.js');
const { Telegraf } = require('telegraf')
const models = require('../../models'); // Use if needed

// Import any extra libraries here

module.exports = {
    name: 'Help',
    description: 'Get help on using OneStop and its various features!',
    async execute(ctx, Telegraf, telegramBot) {
        // Add code here
        await ctx.reply('Thank you for using OneStop! Here is all the information you need:')
        msg = `
        \`/help\` - Get help on using OneStop
        \`/weather <city>\` - Get the weather for a city (leave blank for Singapore)
        \`/covid <country>\` - Get the latest COVID-19 stats for a country (leave blank for Singapore)
        `
    }
}