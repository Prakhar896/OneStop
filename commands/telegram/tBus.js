const Discord = require('discord.js');
const { Telegraf } = require('telegraf')
// const models = require('../../models'); // Use if needed

// Import any extra libraries here
const axios = require('axios');

module.exports = {
    name: 'Bus',
    description: 'Get detailed bus arrival timings with just the bus stop name!',
    sampleCommandUsage: '/bus <bus stop name, not case-sensitive but has to be exact>,\nfor e.g: /bus 96121',
    async execute(ctx, Telegraf, telegramBot) {
        // Add code here
        const busStopName = ctx.message.text.split(' ').slice(1).join(' ');
        const busStopNameLower = busStopName.toLowerCase();

        const datamallAPIToken = process.env.DATAMALL_API_TOKEN;
        var target = 'http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=' + busStopNameLower;
        axios({
            url: target,
            headers: {
                'AccountKey': datamallAPIToken,
                'accept': 'application/json'
            },
            method: 'get'
        }).then(async response => {
            if (response.status === 200) {
                // var busArrivalData = response.data.Services;
                // var busArrivalDataLength = busArrivalData.length;
                // var busArrivalDataString = '';
                // for (var i = 0; i < busArrivalDataLength; i++) {
                //     var busArrivalDataString = busArrivalDataString + 'Bus ' + busArrivalData[i].ServiceNo + ': ' + busArrivalData[i].NextBus.EstimatedArrival + '\n';
                // }
                // var busArrivalDataStringLength = busArrivalDataString.length;
                // if (busArrivalDataStringLength > 4096) {
                //     busArrivalDataString = busArrivalDataString.substring(0, 4096);
                // }
                // ctx.reply(busArrivalDataString);
                msg = `Bus Stop Number: ${busStopNameLower}\n\n`
                var services = response.data.Services
                for (const service of services) {
                    var nextBus = service.NextBus
                    // Get operator name based on operator's shorthand
                    var serviceOperatorName = ''
                    if (service.Operator == 'SBST') {
                        serviceOperatorName = 'SBS Transit'
                    } else if (service.Operator == 'GAS') {
                        serviceOperatorName = 'Go-Ahead Singapore'
                    } else if (service.Operator == 'SMRT') {
                        serviceOperatorName = 'SMRT Corporation'
                    } else if (service.Operator == 'TTS') {
                        serviceOperatorName = 'Tower Transit Singapore'
                    }

                    // Get load name based on bus load shorthand
                    var busLoad = ''
                    if (nextBus.Load == 'SEA') {
                        busLoad = 'Seats Available'
                    } else if (nextBus.Load == 'SDA') {
                        busLoad = 'Standing Available'
                    } else if (nextBus.Load == 'LSD') {
                        busLoad = 'Limited Standing'
                    }

                    // Get time in minutes for bus arrival rounded down to the whole number
                    var now = new Date();
                    var arrivalTime = new Date(nextBus.EstimatedArrival)
                    var timeDiff = arrivalTime.getMinutes() - now.getMinutes()
                    if (timeDiff <= 0) {
                        timeDiff = 'ARRIVING'
                    } else {
                        timeDiff += ' Minutes'
                    }

                    var msg = `Bus: ${service.ServiceNo}\n`
                    msg += `ARRIVAL TIME: ${timeDiff}\n`
                    msg += `Bus Load: ${busLoad}\n`
                    msg += `Bus Operator: ${serviceOperatorName}\n`

                    await ctx.reply(msg)
                }
            }
        }).catch(error => {console.log(error)})
    }
}