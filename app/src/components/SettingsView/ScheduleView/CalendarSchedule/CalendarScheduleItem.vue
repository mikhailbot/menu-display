<template>
<div class="calendar-schedule-item">
  <div class="left-column">
    <div class="item-date">
      <strong>Date: </strong> {{ itemDate }}
    </div>
    <div class="item-image">
      <strong>Menuboard: </strong> {{ imageName }}
    </div>
  </div>
  <div class="right-column">
    <div class="item-remote">
      <div class="item-edit">
        <el-button type="info" :plain="true" icon="edit" size="small" :disabled="true"> Edit</el-button>
      </div>
      <div class="item-delete">
        <el-button type="danger" :plain="true" icon="delete" size="small" @click="remove"> Delete</el-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import { getImages, removeCalendar } from '../../../../database.js'

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

.left-column {
  width: 30rem;
}

.left-column div {
  margin-top: 0.5rem;
}

.right-column div {
  margin-top: 0.25rem;
}

.right-column div button {
  width: 7rem;
}
</style>
