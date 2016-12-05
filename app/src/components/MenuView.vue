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
      return getActive()
    },
    backgroundImage () {
      let path = this.activeImage.filepath

      // Showing images doesn't work in dev
      if (process.env.NODE_ENV === 'development') {
        window.alert(`Active image is ${path}`)
        path = 'https://unsplash.it/1280/720?image=20'
      }

      return {
        'background': `url("${path}")`,
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
}

.menu-image {
  width: 100%;
  height: 100%;
}
</style>
