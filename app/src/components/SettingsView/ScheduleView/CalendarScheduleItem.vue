<template>
<div class="calendar-schedule-item">
  <div class="item-date">
    <strong>Date: </strong> {{ itemDate }}
  </div>
  <div class="item-image">
    <strong>Menuboard: </strong> {{ imageName }}
  </div>
  <div class="item-remote">
    <el-button type="danger" icon="delete" size="small" @click="remove"> Delete</el-button>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import { getImages, removeCalendar } from '../../../database.js'

export default {
  name: 'calendar-schedule-item',

  props: [ 'item' ],

  data () {
    return {
      images: getImages()
    }
  },

  computed: {
    itemDate () {
      return moment(this.item.date).format('MMM Do, YYYY')
    },
    imageName () {
      let result = ''

      this.images.forEach((image) => {
        if (image.id === this.item.image) {
          result = image.filename
        }
      })

      return result
    }
  },

  methods: {
    remove () {
      removeCalendar(this.item.id)
      this.$emit('updateCalendarSchedule')
      this.$notify({
        message: 'Removed scheduled menuboard!',
        type: 'success'
      })
    }
  }

}
</script>

<style scoped>
.calendar-schedule-item {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.item-date {
  width: 13rem
}

.item-image {
  margin: 0 1rem;
  width: 25rem;
}

.item-remove {
  width: 7rem;
}
</style>
