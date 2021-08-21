const Discord = require('discord.js');
const { Telegraf } = require('telegraf')

// Import any extra libraries here

module.exports = {
    name: 'devinfo',
    description: 'Sends information about the bot to developers only.',
    async execute(ctx, Telegraf, telegramBot) {
        // Add code here
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
    }
}