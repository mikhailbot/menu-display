<template>
  <div class="settings-view">

    <h2>Menu Display v{{ this.version }} running on {{ this.hostname }}</h2>

    <div class="title">
      <h3>Active image:</h3> {{ this.activeImageFilename  }}
    </div>
    <div class="title">
      <h3>Current schedule:</h3> {{ this.settings.schedule }}
    </div>
  </div>
</template>

<script>
import os from 'os'
import { getSettings, getActive } from '../../database.js'

export default {
  name: 'settings-general',

  beforeMount () {
    this.settings = getSettings()
  },

  data () {
    return {
      settings: {}
    }
  },

  computed: {
    hostname () {
      return os.hostname()
    },
    activeImage () {
      return getActive()
    },
    activeImageFilename () {
      return this.activeImage ? this.activeImage.filename : 'No active image'
    },
    version () {
      return require('../../../package.json').version || '0.0.0'
    }
  }
}
</script>

<style scoped>
h2 {
  padding-bottom: 2rem;
}

h3 {
  display: inline-block;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
}
</style>
