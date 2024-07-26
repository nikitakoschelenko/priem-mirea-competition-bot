import { Bot } from 'grammy'

import { composers } from './composers'
import { TELEGRAM_TOKEN } from './config'

export const bot = new Bot(TELEGRAM_TOKEN)

bot.use(composers)

bot.catch((err) => {
  console.error(err)
})

bot.start({
  onStart: ({ username }) => {
    console.log(`Bot @${username} started polling updates`)
  },
})
