const Discord = require('discord.js');
const { Telegraf } = require('telegraf')
const models = require('../../models'); // Use if needed

// Import any extra libraries here
const fs = require('fs')

const commandFiles = fs.readdirSync('./commands/telegram/').filter(file => file.endsWith('.js'));

module.exports = {
    name: 'Help',
    description: 'Get help on using OneStop and its various features!',
    async execute(ctx, Telegraf, telegramBot) {
        // Add code here
        await ctx.reply('Thank you for using OneStop! Here is all the information you need:')
        try {
            for (const file of commandFiles) {
                const command = require(`./${file}`)
                if (command.devOnly == true || command.name == 'Help') continue
                var msg = command.name + ' Command\n'
                msg += 'Description: ' + command.description + '\n'
                msg += 'Sample Command Usage: ' + command.sampleCommandUsage
                await ctx.reply(msg)
            }
        } catch (err) {
            console.log('TELE; Error in going through files and sending help message: ' + err)
        }
    }
}