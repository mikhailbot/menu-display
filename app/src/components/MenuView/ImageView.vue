<template>
  <div class="image-view">
      <img :src="image.filepath">
  </div>
</template>

<script>
export default {
  props: [ 'image' ]
}
</script>

<style>
.image-view {
  width: 100vw;
  height: 100vh;
}

.image-view img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
