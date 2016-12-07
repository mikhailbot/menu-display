<template>
  <div>

    <el-menu default-active="/settings/general" class="el-menu" mode="horizontal" :router="true" theme="dark">
      <el-menu-item index="/settings/general">General</el-menu-item>
      <el-menu-item index="/settings/images">Menuboards</el-menu-item>
      <el-menu-item index="/settings/schedule">Schedule</el-menu-item>
      <li @click="quit" class="el-menu-item right-menu">Quit App</li>
      <el-menu-item index="/" class="right-menu">Return to Menuboard</el-menu-item>
    </el-menu>

    <router-view></router-view>

  </div>
</template>

<script>
import { remote } from 'electron'

export default {
  name: 'settings',

  mounted () {
    this.$router.push(this.$children[0].activeIndex)
  },

  methods: {
    quit () {
      remote.app.quit()
    }
  }
}
</script>

<style scoped>
.el-menu--horizontal {
  padding-left: 100px;
  margin: auto;
}

.right-menu {
  float: right;
}

.settings-view {
  width: 800px;
  margin: auto;
  padding: 3rem 1rem;
}
</style>
