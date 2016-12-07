import moment from 'moment'
import schedule from 'node-schedule'
import { getSettings, getWeekly, getCalendar, setActive } from './database'

const scheduleActiveImage = () => {
  const activeSchedule = getSettings().schedule
  const weeklySchedule = getWeekly()
  const calendarySchedule = getCalendar()

  if (activeSchedule === 'weekly') {
    const today = new Date().getDay()
    const image = weeklySchedule.days[today].image || null

    if (image) {
      setActive(image)
    }
  } else if (activeSchedule === 'calendar') {
    const today = moment()

    const schedulesBeforeIncludingToday = calendarySchedule.filter((schedule) => {
      return moment(schedule.date).isSameOrBefore(today, 'day')
    })

    if (schedulesBeforeIncludingToday.length) {
      setActive(schedulesBeforeIncludingToday[schedulesBeforeIncludingToday.length - 1].image)
    }
  }
}

schedule.scheduleJob('0 6 * * *', () => {
  scheduleActiveImage()
})

// Run once on startup
scheduleActiveImage()
