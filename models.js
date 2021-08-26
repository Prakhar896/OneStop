// Models file where some models are defined

module.exports = {
    weatherMoji(skyName) {
        var weatherIcon = ''
        if (skyName.includes('Sunny') | skyName.includes('Clear')) {
            weatherIcon = '☀️'
        }
        else if (skyName.includes('Cloudy')) {
            weatherIcon = '☁️'
        }
        else if (skyName.includes('Snow')) {
            weatherIcon = '❄️'
        }
        else if (skyName.includes('Rain')) {
            if (skyName.includes('Thunderstorm')) {
                weatherIcon = '⛈️'
            }
            else {
                weatherIcon = '🌧️'
            }
        }
        else {
            weatherIcon = '☁️'
        }
        return weatherIcon
    },
    print(data) {
        console.log(data)
    }
}