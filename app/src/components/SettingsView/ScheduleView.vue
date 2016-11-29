<template>
  <div class="settings-view">

    <div class="schedule">
      <h3>Weekly Schedule</h3> <el-switch v-model="weeklySchedule" on-text="" off-text=""></el-switch>
    </div>

    <div class="schedule">
      <h3>Calendar Schedule</h3> <el-switch v-model="calendarSchedule" on-text="" off-text=""></el-switch>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settings-schedule',

  data () {
    return {
      weeklySchedule: true,
      calendarSchedule: false
    }
  }
}
</script>

<style scoped>
.schedule {
  display: flex;
  align-items: center;
}
</style>
