<template>
  <div class="calendar-schedule-edit">
    <el-dialog title="Edit Schedule" v-model="edit.active" size="tiny">

      <div class="edit-dialog">
        <div class="date-picker">
          <div class="edit-label">Date:</div>
          <el-date-picker v-model="localDate" type="date" placeholder="Pick a day" class="picker">
          </el-date-picker>
        </div>
        <div class="image-picker">
          <div class="edit-label">Menuboard</div>
          <image-selector :day="localImage" :images="images" class="picker"></image-selector>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" :plain="true" @click="cancelUpdate">Cancel</el-button>
        <el-button type="success" @click="updateCalendar">Update</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { updateCalendar } from '../../../../database.js'

export default {
  name: 'calendar-schedule-edit',

  props: [ 'id', 'date', 'image', 'edit', 'images' ],

  components: {
    imageSelector: require('../ImageSelector')
  },

  data () {
    return {
      localDate: this.date,
      localImage: {
        image: this.image
      }
    }
  },

  methods: {
    updateCalendar () {
      updateCalendar({
        id: this.id,
        date: this.localDate,
        image: this.localImage.image
      })
      this.$notify.success({
        message: 'Updated schedule entry!',
        offset: 200
      })
      this.edit.active = false
      this.$emit('updateCalendarSchedule')
    },
    cancelUpdate () {
      this.edit.active = false
      this.localDate = this.date
      this.localImage.image = this.image
    }
  }
}
</script>

<style scoped>
.edit-label {
  font-weight: 600;
  padding: 0.5rem 0;
}

.image-picker {
  padding-top: 1rem;
}

.picker {
  width: 15rem;
}
</style>
