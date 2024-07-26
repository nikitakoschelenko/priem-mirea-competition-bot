import { CronJob } from 'cron'

import { checkForUpdates } from './jobs'

const checkForUpdatesJob = new CronJob(
  // every 10 minutes
  '*/10 * * * *',
  checkForUpdates,
  null,
  false,
  'Europe/Moscow',
)

checkForUpdatesJob.start()
checkForUpdatesJob.fireOnTick()
