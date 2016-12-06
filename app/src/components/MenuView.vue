<template>
  <div class="menu-view" @dblclick="goToSettings">
    <div class="menu-image" v-bind:style="backgroundImage"></div>
  </div>
</template>

<script>
import { getActive } from '../database.js'

export default {
  name: 'menu',

  created: function () {
    window.addEventListener('keyup', this.goToSettingsEsc)
  },

  computed: {
    activeImage () {
      // Check every hour for new active image
      setInterval(() => {
        return getActive()
      }, 3600000)

      return getActive()
    },
    backgroundImage () {
      let path = ''
      let filename = ''
      if (this.activeImage) {
        path = this.activeImage.filepath
        filename = this.activeImage.filename
      } else {
        path = ''
        filename = 'no-active-image'
      }

      // Showing images doesn't work in dev
      if (process.env.NODE_ENV === 'development') {
        this.$notify({
          title: '[DEV] Active Image',
          message: filename,
          type: 'info'
        })

        path = 'https://unsplash.it/1280/720?image=20'
      }

      return {
        'background': `url("${path.replace(/\\/g, '\\\\')}")`,
        'background-position': 'center',
        'background-size': 'cover'
      }
    }
  },

  methods: {
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
