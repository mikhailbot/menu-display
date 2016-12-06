import schedule from 'node-schedule'
import { getSettings, getWeekly, setActive } from './database'

const scheduleActiveImage = () => {
  const activeSchedule = getSettings().schedule
  const weeklySchedule = getWeekly()

  if (activeSchedule === 'weekly') {
    const today = new Date().getDay()
    const image = weeklySchedule.days[today].image || null

    if (image) {
      setActive(image)
    }
  }
}

schedule.scheduleJob('0 8 * * *', () => {
  scheduleActiveImage()
})

// Run once on startup
scheduleActiveImage()
