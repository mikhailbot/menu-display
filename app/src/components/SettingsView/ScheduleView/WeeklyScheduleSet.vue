<template>
  <div class="weekly-schedule-set">
    <div class="schedule">
      <div class="day">
        {{ schedule.day }}
      </div>
      <div class="image">
        <image-selector
        :day="schedule"
        :images="images"></image-selector>
      </div>
    </div>
  </div>
</template>

<script>
import { getImages, updateWeekly } from '../../../database.js'

export default {
  name: 'weekly-schedule-set',

  components: {
    imageSelector: require('./ImageSelector')
  },

  props: [ 'day', 'index' ],

  data () {
    return {
      schedule: this.day,
      images: getImages()
    }
  },

  watch: {
    schedule: {
      handler () {
        updateWeekly(this.index, this.schedule.image)

        this.$message({
          message: 'Updated weekly schedule!',
          type: 'success'
        })
      },
      deep: true
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
