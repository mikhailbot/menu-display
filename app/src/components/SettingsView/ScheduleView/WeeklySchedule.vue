<template>
  <div class="weekly-schedule">
    <div v-for="(day, index) in weeklySchedule.days">
      <weekly-schedule-set :day="day" :index="index"></weekly-schedule-set>
    </div>
  </div>
</template>

<script>
import { getImages, getWeekly } from '../../../database.js'

export default {
  name: 'weekly-schedule',

  components: {
    weeklyScheduleSet: require('./WeeklyScheduleSet')
  },

  data () {
    return {
      weeklySchedule: {},
      images: []
    }
  },

  beforeMount () {
    this.weeklySchedule = getWeekly()
    this.images = getImages()
  }
}
</script>

<style scoped>
</style>
