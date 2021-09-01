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
        if (!args[1]) {
            query = 'general';
        } else {
            query = args[1];
        }
        newsapi.v2.topHeadlines({
            country: 'sg',
            q: query,
            language: 'en',
            category: 'business'
          }).then(response => {
            console.log(response.articles[0]);
          });
    }
}