<template>
  <div class="video-view">
    <video :src="video.filepath" loop="true" autoplay="true"></video>
  </div>
</template>

<script>
export default {
  props: [ 'video' ]
}
</script>

<style>
.video-view {
  width: 100vw;
  height: 100vh;
}

.video-view video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
