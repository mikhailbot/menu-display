<template>
  <div class="settings-view">

    <div class="list-images">
      <h3>Available Images</h3>
      <div v-for="image in images">
        <div class="image">
          <span class="image-name">{{ image.name }}</span>
        </div>
      </div>
    </div>

    <h3>Upload New Menuboard</h3>
    <el-button type="primary" size="large"><i class="el-icon-upload"></i> Upload Image</el-button>
</div>
</template>

<script>
export default {
  name: 'settings-images',

  data () {
    return {
      images: [
        {
          uuid: 'abcd123',
          filepath: '/file/path/to/image.jpg',
          name: 'image.jpg'
        },
        {
          uuid: 'abcd124',
          filepath: '/file/path/to/base.jpg',
          name: 'base.jpg'
        },
        {
          uuid: 'abcd125',
          filepath: '/file/path/to/hat.jpg',
          name: 'hat.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>
.list-images {
  margin-bottom: 2rem;
}

.image {
  padding-bottom: 5px;
}
</style>
