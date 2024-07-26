import { Composer } from 'grammy'

import { commandsComposer } from './commands'

export const composers = new Composer()

composers.use(commandsComposer)
