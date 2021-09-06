const Discord = require('discord.js');
const { Telegraf } = require('telegraf')
const models = require('../../models'); // Use if needed

// Import any extra libraries here
const NewsAPI = require('newsapi');

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

module.exports = {
    name: 'News',
    description: 'Fetches and displays the latest news from CNA',
    async execute(ctx, Telegraf, telegramBot) {
        // Add code here
        args = ctx.message.text.split(' ');
        
        var category = ''
        if (!args[1]) {
            category = 'technology'
        } else {
            category = args[1]
        }

        var query = ''
        if (!(args.slice(2).join(' '))) {
            query = ''
        } else {
            query = args.slice(2).join(' ')
        }

        var params = {
            country: 'sg',
            category: category,
            language: 'en'
        }
        if (query != '') {
            params.q = query
        }
        
        newsapi.v2.topHeadlines(params).then(response => {
            console.log(response.articles[0]);
          });
    }
}