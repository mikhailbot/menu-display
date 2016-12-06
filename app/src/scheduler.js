import schedule from 'node-schedule'
import { getSettings, getWeekly, setActive } from './database'

schedule.scheduleJob('*/15 * * * * *', () => {
  const activeSchedule = getSettings().schedule
  const weeklySchedule = getWeekly()

  if (activeSchedule === 'weekly') {
    const today = new Date().getDay()
    const image = weeklySchedule.days[today].image || null

    if (image) {
      setActive(image)
    }
  }
})
