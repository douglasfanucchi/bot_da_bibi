const Discord   = require('discord.js')
const Client    = new Discord.Client()
const { token } = require('../config')
const { messageHandler } = require('./handlers')

global.dispatcher = null
global.songs = []

Client.on('message', messageHandler)

Client.login(token)