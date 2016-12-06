<template>
  <div class="weekly-schedule">
    <div v-for="(day, index) in weeklySchedule.days">
      <div class="schedule">
        <div class="day">
          {{ day.day }}
        </div>
        <div class="image">
          <image-selector
            :current="day.image"
            :images="images"
            :index="index"
            v-on:updateWeeklySchedule="updateWeeklySchedule"></image-selector>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getImages, getWeekly, updateWeekly } from '../../../database.js'

export default {
  name: 'weekly-schedule',

  components: {
    imageSelector: require('./ImageSelector')
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
  },

  methods: {
    updateWeeklySchedule (day, image) {
      const newSchedule = updateWeekly(day, image)
      this.weeklySchedule = newSchedule
      this.$notify({
        message: 'Updated weekly schedule!',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.schedule {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.day {
  width: 150px;
}
</style>
