<template>
<div class="calendar-schedule-item">
  <div class="item-date">
    <strong>Date: </strong> {{ itemDate }}
  </div>
  <div class="item-image">
    <strong>Menuboard: </strong> {{ imageName }}
  </div>
</div>
</template>

<script>
import moment from 'moment'
import { getImages } from '../../../database.js'

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

.item-image {
  margin: 0 1rem;
}
</style>
