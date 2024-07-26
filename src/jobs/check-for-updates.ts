import { getCompetitionEntrants } from '../api'
import { bot } from '../bot'
import { COMPETITIONS, PERSONAL_CODE, TELEGRAM_CHAT_ID } from '../config'
import { mapCompetitionEntrantToText, mapCompetitionToText } from '../mappers'
import { prisma } from '../prisma'

export async function checkForUpdates() {
  console.log('Checking for updates...')

  for (const competitionId of COMPETITIONS) {
    try {
      const data = await getCompetitionEntrants(competitionId)
      const competition = data[0]

      const competitionFromDb = await prisma.competition.findUnique({
        where: { id: competition.id },
      })

      if (
        !competitionFromDb ||
        competitionFromDb.updatedAt < new Date(competition.updated_at)
      ) {
        const text = [
          mapCompetitionToText(data[0]),
          mapCompetitionEntrantToText(data[0], PERSONAL_CODE),
        ].join('\n\n')

        await bot.api.sendMessage(TELEGRAM_CHAT_ID, text, {
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
    } catch (e) {
      console.error(e)
    }
  }
}
