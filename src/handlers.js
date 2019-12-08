const { prefix } = require('../config')
const commands = require('./commands')

module.exports = {
    messageHandler(message) {
        if( !message.content.startsWith(prefix) ) return

        let input = message.content.split(' ')

        // Remove prefix
        input.shift()

        const command = input.shift()
        const song = input.shift()
        const func = commands[command]

        if( !func ) {
            message.reply('comando inválido!')
            return
        }

        func(message, song)
    }
}