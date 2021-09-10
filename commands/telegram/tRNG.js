const Discord = require('discord.js');
const { Telegraf } = require('telegraf')
const models = require('../../models'); // Use if needed

// Import any extra libraries here

module.exports = {
    name: 'RNG',
    description: 'Random Number Generator',
    sampleCommandUsage: '/rng <lower number>-<higher number>(range is optional, the default range is 1-10),\nfor e.g: /rng 1-100',
    async execute(ctx, Telegraf, telegramBot) {
        // Add code here
        args = ctx.message.text.split(' ');
        var min = 0
        var max = 10
        if (!args[1]) {
            min = 1
            max = 10
        } else {
            min = args[1].split('-')[0]
            max = args[1].split('-')[1]
        }
        var random = models.generateRandomNumber(min, max)
        await ctx.reply(`Random Number: ${random}`)
    }
}