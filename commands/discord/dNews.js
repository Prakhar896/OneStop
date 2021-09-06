const Discord = require('discord.js');
const newsLink = process.env.NEWS_URL;
const axios = require('axios');
module.exports = {
    name: 'news',
    description: 'Get the latest news from the server.',
    execute(msg, args, Discord, discordBot) {
        axios.get(newsLink).then(response => {
                const news = response.data
                sendNewsEmbed(msg, news)
            })
    }
}


function sendNewsEmbed(msg, response) {
    try { 
    const newsEmbed = new Discord.MessageEmbed()
        .setTitle(`Latest Headlines`)
        .setFooter(`From Google News`)
        .addField(response[0][0], `[Full Article](${response[0][1]})`)
        .addField(response[1][0], `[Full Article](${response[1][1]})`)
        .addField(response[2][0], `[Full Article](${response[2][1]})`)
        .addField(response[3][0], `[Full Article](${response[3][1]})`)
        .addField(response[4][0], `[Full Article](${response[4][1]})`)
        .setColor('RANDOM');
    msg.channel.send(newsEmbed);
    } catch (err) {
        console.log(err)
        msg.channel.send('Error sending the latest headlines.'+ err)
    }
}


