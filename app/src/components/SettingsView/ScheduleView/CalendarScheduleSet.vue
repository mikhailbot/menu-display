<template>
  <div class="calendar-schedule-set">
    <div class="date-picker">
      <el-date-picker v-model="schedule.date" type="date" placeholder="Pick a day">
      </el-date-picker>
    </div>
    <div class="image-picker">
      <image-selector :day="schedule" :images="images"></image-selector>
    </div>
    <el-button type="success" icon="plus" @click="addSchedule"> Add</el-button>
  </div>
</template>

<script>
import { getImages, addCalendarSchedule } from '../../../database'

export default {
  name: 'calendar-schedule-set',

  components: {
    imageSelector: require('./ImageSelector')
  },

  data () {
    return {
      schedule: {
        date: '',
        image: ''
      },
      images: getImages()
    }
  },
  methods: {
    addSchedule () {
      if (this.schedule.date && this.schedule.image) {
        addCalendarSchedule(this.schedule.date, this.schedule.image)
        this.$notify({
          message: 'Added new scheduled menuboard!',
          type: 'success'
        })
        this.schedule = {
          date: '',
          image: ''
        }
        this.$emit('updateCalendarSchedule')
      }
    }
  }
}
</script>

<style scoped>
.calendar-schedule-set {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.image-picker {
  margin: 0 1rem;
}
</style>
