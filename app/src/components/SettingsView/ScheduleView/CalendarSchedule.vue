<template>
  <div class="calendar-view">
    <div class="add-schedule">
      <h3>Add new scheduled board</h3>
      <calendar-schedule-set v-on:updateCalendarSchedule="updateCalendarSchedule"></calendar-schedule-set>
    </div>
    <div class="view-upcoming-schedule">
      <h3>Upcoming scheduled boards:</h3>
      <div v-for="item in upcomingCalendarSchedule">
        <calendar-schedule-item :item="item" v-on:updateCalendarSchedule="updateCalendarSchedule"></calendar-schedule-item>
      </div>
    </div>
    <div class="view-previous-schedule">
      <h3>Previously scheduled boards:</h3>
      <div v-for="item in previousCalendarSchedule">
        <calendar-schedule-item :item="item" v-on:updateCalendarSchedule="updateCalendarSchedule"></calendar-schedule-item>
      </div>
    </div>
  </div>
</template>

<script>
import { getUpcomingCalendar, getPreviousCalendar } from '../../../database.js'

export default {
  name: 'calendar-schedule',

  components: {
    calendarScheduleSet: require('./CalendarSchedule/CalendarScheduleSet'),
    calendarScheduleItem: require('./CalendarSchedule/CalendarScheduleItem')
  },

  data () {
    return {
      unsortedUpcoming: getUpcomingCalendar(),
      unsortedPrevious: getPreviousCalendar()
    }
  },

  computed: {
    upcomingCalendarSchedule () {
      return this.unsortedUpcoming.sort((a, b) => {
        return b - a
      })
    },
    previousCalendarSchedule () {
      return this.unsortedPrevious.sort((a, b) => {
        return b - a
      })
    }
  },

  methods: {
    updateCalendarSchedule () {
      this.unsortedUpcoming = getUpcomingCalendar()
      this.unsortedPrevious = getPreviousCalendar()
    }
  }

}
</script>

<style scoped>
.add-schedule {
  margin: 1rem 0;
}

.add-schedule h3 {
  margin: 1rem 0;
}

.view-upcoming-schedule {
  margin: 2rem 0;
}
</style>
