import { stripIndents } from 'common-tags'

import { CompetitionEntrants, Entrant } from '../api'

export function mapCompetitionEntrantToText(
  competition: CompetitionEntrants,
  spn: string,
) {
  const entrant = competition.entrants.find((e) => e.spn === spn)

  if (!entrant) {
    return ''
  }

  const getPlace = (predicate: (e: Entrant) => unknown): number => {
    const filtered = competition.entrants.filter(predicate)
    const index = filtered.findIndex((e) => e.spn === spn)
    return index + 1
  }

  const text = stripIndents`
    \`${entrant.p}\` приоритет
    \`${getPlace((e) => e.ioi)}\` место по оригиналам / \`${getPlace((e) => e.iHPO)}\` место ВП по оригиналам / \`${getPlace((e) => e.iHP)}\` место ВП Все
  `

  return text
}
