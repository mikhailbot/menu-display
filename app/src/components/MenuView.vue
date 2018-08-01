<template>
  <div class="menu-view" @dblclick="goToSettings">
    <image-view v-if="image" :image="image"></image-view>
    <video-view v-if="video" :video="video"></video-view>
  </div>
</template>

<script>
import { getActive } from '../database.js'
import ImageView from './MenuView/ImageView.vue'
import VideoView from './MenuView/VideoView.vue'

export default {
  name: 'menu-view',

  components: {
    ImageView,
    VideoView
  },

  created: function () {
    window.addEventListener('keyup', this.goToSettingsEsc)

    setInterval(() => {
      return this.loadMenu()
    }, 1000 * 60 * 10)

    return this.loadMenu()
  },

  data () {
    return {
      image: undefined,
      video: undefined
    }
  },

  methods: {
    loadMenu () {
      const activeMenuboard = getActive()
      const imageRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jpg|.jpeg|.png)$/
      const videoRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.mp4)$/

      if (!activeMenuboard.filepath) {
        this.image.filepath = require('./western').image
        this.video = undefined
      } else if (imageRegex.test(activeMenuboard.filepath)) {
        this.image = activeMenuboard
        this.video = undefined

        // Showing images doesn't work in dev
        if (process.env.NODE_ENV === 'development') {
          this.$message({
            title: '[DEV] Active Image',
            message: activeMenuboard.filename,
            type: 'info'
          })

          this.image.filepath = 'https://unsplash.it/1920/1080?image=20'
        }
      } else if (videoRegex.test(activeMenuboard.filepath)) {
        this.video = activeMenuboard
        this.image = undefined

        // Showing video doesn't work in dev
        if (process.env.NODE_ENV === 'development') {
          this.$message({
            title: '[DEV] Active Image',
            message: activeMenuboard.filename,
            type: 'info'
          })

          this.video.filepath = 'https://cdn-pro.dprcdn.net/files/acc_510434/kUh3Zy'
        }
      }
    },

    goToSettings () {
      this.$router.push('/settings/general')
    },
    goToSettingsEsc (event) {
      if (event.key === 'Escape') {
        this.$router.push('/settings/general')
      }
    }
  }
}
</script>

<style scoped>
.menu-view {
  width: 100vw;
  height: 100vh;
  cursor: none;
}

.menu-image {
  width: 100%;
  height: 100%;
}
</style>
