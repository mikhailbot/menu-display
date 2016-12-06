<template>
  <div class="image-selector">
    <el-select v-model="day.image" placeholder="Select">
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

  props: [ 'day', 'images' ]
}
</script>

<style scoped>

</style>
