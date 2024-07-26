import { request } from 'undici'

import { API_BASE_URL } from './config'

export type CompetitionsApiGetEntrantsResult =
  | {
      data: CompetitionEntrants[]
    }
  | {
      error: string
    }
  | {
      errors: Record<string, string[]>[]
    }

export type CompetitionEntrants = {
  /** всего подавших документы */
  app_count: number
  /** с оригиналами */
  app_original_count: number
  /** дата обновления */
  updated_at: string
  /** набор предметов ЕГЭ */
  exam_set_variant: string[]
  id: string
  /** количество мест */
  plan: number
  /** текущий проходной балл */
  min_score: string
  /** минимальный балл для получения гранта */
  min_grant: number
  /** название конкурса */
  title: string
  /** название специальности */
  programSet_title: string
  /** участники */
  entrants: Entrant[]
}

export type Entrant = {
  /** баллы ИД */
  am: string
  /** баллы ЕГЭ */
  em: string
  /** сумма баллов */
  fm: string
  id: number
  /** ВП по всем */
  iHP?: 1
  /** ВП по оригиналам */
  iHPO?: 1
  /** наличие оригинала */
  ioi?: 1
  /** баллы ЕГЭ по предметам (см. CompetitionEntrants['exam_set_variant']) */
  m: string[]
  /** потребность в общежитии */
  nd?: '1'
  /** приоритет */
  p: number
  /** СНИЛС */
  spn: string
  /** статус */
  s: string
  /** общежитие отказано или гарантировано */
  dc?: -1 | 1
}

export class APIError extends Error {}

export async function getCompetitionEntrants(
  competitions: string | string[],
): Promise<CompetitionEntrants[]> {
  const path = '/entrants'
  const query = (Array.isArray(competitions) ? competitions : [competitions])
    .map((comp) => `competitions[]=${comp}`)
    .join('&')
  const url = `${API_BASE_URL}${path}?${query}`

  console.log(`Calling API: ${url}`)

  const { statusCode, body } = await request(url)

  if (statusCode !== 200) {
    throw new APIError(`server returned code ${statusCode}`)
  }

  const result = (await body.json()) as CompetitionsApiGetEntrantsResult

  if ('error' in result || 'errors' in result) {
    if ('error' in result) {
      throw new APIError(result.error)
    }

    if ('errors' in result) {
      throw new APIError(JSON.stringify(result.errors))
    }
  }

  return result.data
}
