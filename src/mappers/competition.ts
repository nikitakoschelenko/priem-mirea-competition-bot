import { stripIndents } from 'common-tags'

import { CompetitionEntrants } from '../api'

export function mapCompetitionToText(competition: CompetitionEntrants) {
  const text = stripIndents`
    *${competition.programSet_title}*
    _${competition.title}_

    актуально на \`${new Date(competition.updated_at).toLocaleString('ru', { timeZone: 'Europe/Moscow' })}\`

    \`${competition.app_count}\` мест / \`${competition.app_original_count}\` оригиналов / \`${competition.min_score}\` баллов текущий проходной
  `

  return text
}
