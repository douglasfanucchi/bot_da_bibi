const path = require('path')
const fs = require('fs')

module.exports = {
    async play(message, song) {
        const author = message.member

        if (!author.voiceChannel) {
            message.reply('Você não está em um canal de voz')
            return
        }

        const voiceConnection = await author.voiceChannel.join()
        const songPath = path.resolve(__dirname, '..', 'songs', `${song}.ogg`)

        if( !fs.existsSync( songPath ) ) {
            message.reply('a Beatriz Silva ainda não me mandou esse áudio ainda!')
            return
        }

        if( !global.dispatcher || global.songs.length === 0 )
            global.dispatcher = voiceConnection.playFile( songPath )

        global.songs.push( songPath )

        global.dispatcher.on('end', () => {
            global.dispatcher.end()

            if( global.songs.length === 0 ) return

            global.dispatcher = voiceConnection.playFile( global.songs.shift() )
        })
    }
}