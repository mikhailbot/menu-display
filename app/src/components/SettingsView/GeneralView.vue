<template>
  <div class="settings-view">
    
    <h3>Menu Display running on {{ this.hostname }}</h3>

    <span class="title"><span>Active image:</span> menuboard-1</span>
    <span class="title"><span>Next scheduled image:</span> menuboard-2</span>
  </div>
</template>

<script>
import os from 'os'
export default {
  name: 'settings-general',

  computed: {
    hostname () {
      return os.hostname()
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
