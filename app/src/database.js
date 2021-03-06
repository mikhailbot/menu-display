import { remote } from 'electron'
import fs from 'fs-extra'
import path from 'path'
import low from 'lowdb'
import uuid from 'node-uuid'
import moment from 'moment'

const app = remote.app
const userDir = app.getPath('userData')

const db = low(path.resolve(userDir, 'db.json'))

db.defaults({
  settings: {
    schedule: 'none',
    activeImage: ''
  },
  images: [],
  startDates: [],
  weeklySchedule: {
    days: [
      { day: 'Sunday', image: '' },
      { day: 'Monday', image: '' },
      { day: 'Tuesday', image: '' },
      { day: 'Wednesday', image: '' },
      { day: 'Thursday', image: '' },
      { day: 'Friday', image: '' },
      { day: 'Saturday', image: '' }
    ]
  }
}).write()

const images = db.get('images')
const weeklySchedule = db.get('weeklySchedule')
const calendarSchedule = db.get('startDates')

const getSettings = () => {
  return db.get('settings').value()
}

const setSchedule = (schedule) => {
  db.set('settings.schedule', schedule).write()
}

const getActive = () => {
  const activeImage = db.get('settings').value().activeImage
  return images.find({ id: activeImage }).value()
}

const setActive = (imageId) => {
  db.set('settings.activeImage', imageId).write()
}

const getImages = () => {
  return images.sortBy('filename').value()
}

const uploadImage = (filepath, callback) => {
  const newFilePath = path.resolve(userDir, 'images', path.basename(filepath))
  const filename = path.basename(filepath).toLowerCase()

  fs.copy(filepath, newFilePath, (error) => {
    if (error) {
      return callback(error, null)
    }
    images.push({
      id: uuid(),
      filename: filename,
      filepath: newFilePath
    }).write()

    // Return new array
    return callback(null, images.sortBy('filename').value())
  })
}

const removeImage = (id, callback) => {
  const image = images.find({ id: id }).value()

  // Check if image exists in either schedule and delete entries
  calendarSchedule.remove({ image: id }).write()
  weeklySchedule.find({ image: id }).assign({ image: '' }).value()

  fs.remove(image.filepath, (error) => {
    if (error) {
      return callback(error, null)
    }
    images.remove({ id: id }).write()

    // Return new array
    return callback(null, images.sortBy('filename').value())
  })
}

const getWeekly = () => {
  return weeklySchedule.value()
}

const updateWeekly = (index, image) => {
  db.get(`weeklySchedule.days[${index}]`).assign({ image: image }).write()
}

const getUpcomingCalendar = () => {
  const schedules = calendarSchedule.sortBy('date').value()
  const today = moment()
  let activeSchedule = {}

  const schedulesBeforeIncludingToday = schedules.filter((schedule) => {
    return moment(schedule.date).isSameOrBefore(today, 'day')
  })

  if (schedulesBeforeIncludingToday.length) {
    activeSchedule = schedulesBeforeIncludingToday[schedulesBeforeIncludingToday.length - 1]
  }

  let upcomingSchedules = schedules.filter((schedule) => {
    return moment(schedule.date).isAfter(today, 'day')
  })

  if (activeSchedule.date) {
    upcomingSchedules.unshift(activeSchedule)
  }

  return upcomingSchedules
}

const getPreviousCalendar = () => {
  const schedules = calendarSchedule.sortBy('date').value()
  const today = moment()

  let schedulesBeforeIncludingToday = schedules.filter((schedule) => {
    return moment(schedule.date).isSameOrBefore(today, 'day')
  })

  if (schedulesBeforeIncludingToday.length) {
    schedulesBeforeIncludingToday.pop()
  }

  return schedulesBeforeIncludingToday
}

const addCalendarSchedule = (date, image) => {
  return new Promise((resolve, reject) => {
    if (calendarSchedule.find({ date: date }).value()) {
      return reject('A schedule entry exists for this day already!')
    } else {
      calendarSchedule.push({
        id: uuid(),
        date: date,
        image: image
      }).write()
      return resolve()
    }
  })
}

const removeCalendar = (id) => {
  calendarSchedule.remove({ id: id }).write()
}

const updateCalendar = (schedule) => {
  calendarSchedule.find({ id: schedule.id }).assign({ date: schedule.date, image: schedule.image }).write()
}

export { getSettings, setSchedule, getActive, setActive, getImages, uploadImage, removeImage, getWeekly, updateWeekly, getUpcomingCalendar, getPreviousCalendar, addCalendarSchedule, removeCalendar, updateCalendar }
