import { remote } from 'electron'
import fs from 'fs-extra'
import path from 'path'
import low from 'lowdb'
import uuid from 'node-uuid'

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

const getImages = () => {
  return db.get('images').value()
}

const uploadImage = (filepath, callback) => {
  const newFilePath = path.resolve(userDir, 'images', path.basename(filepath))
  const filename = path.basename(filepath)

  fs.copy(filepath, newFilePath, (error) => {
    if (error) {
      return callback(error, null)
    }
    db.get('images').push({
      id: uuid(),
      filename: filename,
      filepath: newFilePath
    }).value()

    // Return new array
    return callback(null, db.get('images').value())
  })
}

const removeImage = (id, callback) => {
  const image = db.get('images').find({ id: id }).value()

  fs.remove(image.filepath, (error) => {
    if (error) {
      return callback(error, null)
    }
    db.get('images').remove({ id: id }).value()

    // Return new array
    return callback(null, db.get('images').value())
  })
}

export { getSettings, setSchedule, getImages, uploadImage, removeImage }
