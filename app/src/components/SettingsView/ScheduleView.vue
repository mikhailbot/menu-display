<template>
  <div class="settings-view">

    <div class="schedule">
      <h3>Weekly Schedule</h3> <el-switch v-model="weeklySchedule" on-text="" off-text=""></el-switch>
    </div>

    <div v-if="weeklySchedule">
      <weekly-schedule></weekly-schedule>
    </div>

    <div class="schedule">
      <h3>Calendar Schedule</h3> <el-switch v-model="calendarSchedule" on-text="" off-text=""></el-switch>
    </div>

    <div v-if="calendarSchedule">
      <calendar-schedule></calendar-schedule>
    </div>
  </div>
</template>

<script>
import { getSettings, setSchedule } from '../../database.js'

export default {
  name: 'settings-schedule',

  components: {
    weeklySchedule: require('./ScheduleView/WeeklySchedule'),
    calendarSchedule: require('./ScheduleView/CalendarSchedule')
  },

  beforeMount () {
    const settings = getSettings()

    this.weeklySchedule = settings.schedule === 'weekly'
    this.calendarSchedule = settings.schedule === 'calendar'
  },

  data () {
    return {
      weeklySchedule: true,
      calendarSchedule: false
    }
  },

  methods: {
    saveSchedule () {
      const schedule = this.weeklySchedule ? 'weekly' : this.calendarSchedule ? 'calendar' : 'none'
      setSchedule(schedule)
    }
  },

  watch: {
    weeklySchedule (change) {
      if (change) {
        this.calendarSchedule = false
      }
      this.saveSchedule()
    },
    calendarSchedule (change) {
      if (change) {
        this.weeklySchedule = false
      }
      this.saveSchedule()
    }
  }
}
</script>

<style scoped>
.schedule {
  display: flex;
  align-items: center;
}
</style>
