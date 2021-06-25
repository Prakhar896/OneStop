const Discord = require('discord.js')
require('dotenv').config();
const discordBot = new Discord.Client();

discordBot.on('ready', ()=> {
    console.log('OneStop is ready to serve!')
})

discordBot.login(process.env.DISCORD_BOT_TOKEN)