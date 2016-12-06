<template>
  <div class="settings-view">

    <h3>Menu Display running on {{ this.hostname }}</h3>

    <span class="title"><span>Active image:</span> {{ this.activeImageFilename  }}</span>
    <span class="title"><span>Current schedule:</span> {{ this.settings.schedule }}</span>
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
    }
  }
}
</script>

<style scoped>
.hostname {
  padding-bottom: 2rem;
  font-size: 2rem;
}

.title {
  display: block;
  padding-bottom: 10px;
}

.title span {
  font-size: 1.1rem;
  font-weight: 600;
}
</style>
