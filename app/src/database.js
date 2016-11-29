import { remote } from 'electron'
// import fs from 'fs-extra'
import path from 'path'
import low from 'lowdb'
// import uuid from 'node-uuid'

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
}).value()

const getSettings = () => {
  return db.get('settings').value()
}

const setSchedule = (schedule) => {
  db.set('settings.schedule', schedule).value()
}

export { getSettings, setSchedule }
