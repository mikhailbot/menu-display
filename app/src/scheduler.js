import schedule from 'node-schedule'
import { getSettings, getWeekly, getUpcomingCalendar, setActive } from './database'

const scheduleActiveImage = () => {
  const activeSchedule = getSettings().schedule
  const weeklySchedule = getWeekly()
  const calendarSchedule = getUpcomingCalendar()

  if (activeSchedule === 'weekly') {
    const today = new Date().getDay()
    const image = weeklySchedule.days[today].image || null

    if (image) {
      setActive(image)
    }
  } else if (activeSchedule === 'calendar') {
    if (calendarSchedule.length) {
      setActive(calendarSchedule[0].image)
    }
  }
}

schedule.scheduleJob('0 6 * * *', () => {
  scheduleActiveImage()
})

// Run once on startup
scheduleActiveImage()
