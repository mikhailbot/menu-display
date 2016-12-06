<template>
  <div class="calendar-view">
    <div class="add-schedule">
      <h4>Add new scheduled board</h4>
      <calendar-schedule-set v-on:updateCalendarSchedule="updateCalendarSchedule"></calendar-schedule-set>
    </div>
    <div class="view-schedule">
      <h4>Upcoming scheduled boards:</h4>
      <div v-for="item in calendarSchedule">
        <calendar-schedule-item :item="item" v-on:updateCalendarSchedule="updateCalendarSchedule"></calendar-schedule-item>
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
      unsortedDates: getCalendar()
    }
  },

  computed: {
    calendarSchedule () {
      return this.unsortedDates.sort((a, b) => {
        return b - a
      })
    }
  },

  methods: {
    updateCalendarSchedule () {
      this.unsortedDates = getCalendar()
    }
  }

}
</script>

<style scoped>
.add-schedule {
  margin: 1rem 0;
}

.add-schedule h4 {
  margin: 1rem 0;
}

.view-schedule {
  margin: 2rem 0;
}
</style>
