<template>
  <div class="image-selector">
    <el-select v-model="currentImage" placeholder="Select">
      <el-option
        v-for="image in images"
        :label="image.filename"
        :value="image.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'image-selector',

  props: [ 'current', 'images', 'index' ],

  data () {
    return {
      currentImage: this.current
    }
  },

  watch: {
    currentImage () {
      this.$emit('updateWeeklySchedule', this.index, this.currentImage)
    }
  }
}
</script>

<style scoped>

</style>
