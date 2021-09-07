const Discord = require('discord.js');
const { Telegraf } = require('telegraf')
const models = require('../../models'); // Use if needed

// Import any extra libraries here
const GoogleNewsScraper = require('google-news-scraper');

module.exports = {
    name: 'News',
    description: 'Fetches and displays the latest news.',
    async execute(ctx, Telegraf, telegramBot) {
        // Add code here
        // Example message format: /news relevant(<-- optional filtering tag) <search query>
        const args = ctx.message.text.split(' ');
        var searchQuery = ''
        if (args[1] == 'relevant') {
            searchQuery = args.slice(2).join(' ');
        } else {
            searchQuery = args.slice(1).join(' ');
        }
        
        if (!searchQuery) return await ctx.reply('Please give a search query for the latest news.')

        await ctx.reply('Please wait a moment while I fetch the latest news...')
        var articles = []
        try {
            articles = await GoogleNewsScraper({
                searchTerm: searchQuery,
                prettyURLs: false,
                queryVars: {
                    hl:"en-SG",
                    gl:"SG",
                    ceid:"SG:en"
                  },
                timeframe: "1d"
            })
        } catch (err) {
            console.log('TELE; Error in fetching news data from scraper: ' + err)
            await ctx.reply('Sorry, there was an error in fetching the news data. Please try again.')
            return
        }

        if (articles.length == 0) return await ctx.reply('No articles found.')
        
        // Filter articles if necessary
        var articlesCount = 0
        if (args[1] == 'relevant') {
            var relevantArticles = []
            articles.forEach(article => {
                if (articlesCount >= 5) return;
                if (article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) {
                    relevantArticles.push(article)
                    articlesCount += 1
                }
                if (article.source == ('The Straits Times') || article.source == ('CNA')) {
                    relevantArticles.push(article)
                    articlesCount += 1
                }
            });

            // Send the articles, each with its own message
            relevantArticles.forEach(async article => {
                var msg = '' + article.source + ': ' + article.time + '\n'
                msg += '\n' + article.title + '\n'
                msg += '\nLink: ' + article.link
                await ctx.reply(msg)
            })
        } else {
            for (var i = 0; i < 5; i++) {
                article = articles[i]
                var msg = '' + article.source + ': ' + article.time + '\n'
                msg += '\n' + article.title + '\n'
                msg += '\nLink: ' + article.link
                await ctx.reply(msg)
            }
        }
    }
}


// Copied from stackoverflow, makes code sleep for a given number of ms
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}