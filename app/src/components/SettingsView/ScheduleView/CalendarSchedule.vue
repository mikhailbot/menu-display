<template>
  <div class="calendar-view">
    <div class="add-schedule">
      <h4>Add new scheduled board</h4>
      <calendar-schedule-set v-on:updateCalendarSchedule="updateCalendarSchedule"></calendar-schedule-set>
    </div>
    <div class="view-schedule">
      <h4>Currently scheduled boards:</h4>
      <div v-for="item in calendarSchedule">
        <calendar-schedule-item :item="item"></calendar-schedule-item>
      </div>
    </div>
  </div>
</template>

<script>
import { getCalendar } from '../../../database.js'

export default {
  name: 'calendar-schedule',

  components: {
    calendarScheduleSet: require('./CalendarScheduleSet'),
    calendarScheduleItem: require('./CalendarScheduleItem')
  },

  data () {
    return {
      calendarSchedule: getCalendar()
    }
  },

  methods: {
    updateCalendarSchedule () {
      this.calendarSchedule = getCalendar()
    }
  }

}
</script>

<style scoped>

</style>
