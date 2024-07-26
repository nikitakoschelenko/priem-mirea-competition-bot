import { Composer } from 'grammy'

import { getCompetitionEntrants } from '../api'
import { COMPETITIONS, PERSONAL_CODE } from '../config'
import { mapCompetitionEntrantToText, mapCompetitionToText } from '../mappers'
import { prisma } from '../prisma'

export const commandsComposer = new Composer()

commandsComposer.command('start', async (ctx) => {
  for (const competitionId of COMPETITIONS) {
    const data = await getCompetitionEntrants(competitionId)
    const competition = data[0]

    const text = [
      mapCompetitionToText(competition),
      mapCompetitionEntrantToText(competition, PERSONAL_CODE),
    ].join('\n\n')

    await ctx.reply(text, {
      parse_mode: 'Markdown',
    })

    await prisma.competition.upsert({
      where: { id: competition.id },
      create: {
        id: competition.id,
        updatedAt: new Date(competition.updated_at),
      },
      update: { updatedAt: new Date(competition.updated_at) },
    })
  }
})
