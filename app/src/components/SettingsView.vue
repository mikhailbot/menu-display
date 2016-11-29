<template>
  <div>

    <el-menu default-active="/settings/general" class="el-menu" mode="horizontal" :router="true" theme="dark">
      <el-menu-item index="/settings/general">General</el-menu-item>
      <el-menu-item index="/settings/images">Images</el-menu-item>
      <el-menu-item index="/settings/schedule">Schedule</el-menu-item>
      <el-menu-item index="/" class="right-menu">Exit</el-menu-item>
    </el-menu>

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'settings',

  mounted () {
    this.$router.push(this.$children[0].activeIndex)
  }
}
</script>

<style scoped>
h1 {
  font-weight: 400;
}

.el-menu--horizontal {
  padding-left: 100px;
  margin: auto;
}

.right-menu {
  float: right;
}
</style>
