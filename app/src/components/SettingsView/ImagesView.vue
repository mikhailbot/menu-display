<template>
  <div class="settings-view">

    <div class="list-images">
      <h3>Available Images</h3>
      <div v-for="image in images">
        <div class="image">
          <span class="image-name">{{ image.filename }}</span>
          <el-button type="danger" size="small" icon="delete" v-on:click="removeImage(image.id)"></el-button>
        </div>
      </div>
    </div>

    <h3>Upload New Menuboard</h3>
    <el-button type="primary" size="large" v-on:click="uploadNewImage()"><i class="el-icon-upload"></i> Upload Image</el-button>
  </div>
</template>

<script>
import { remote } from 'electron'
import { getImages, uploadImage, removeImage } from '../../database'

const dialog = remote.dialog

export default {
  name: 'settings-images',

  beforeMount () {
    this.getImagesList()
  },

  data () {
    return {
      images: []
    }
  },

  methods: {
    getImagesList () {
      this.images = getImages()
    },
    uploadNewImage () {
      const vm = this

      dialog.showOpenDialog({}, (filenames) => {
        if (filenames) {
          uploadImage(filenames[0], (error, result) => {
            if (error) {
              console.log(error)
            }
            vm.images = []
            vm.images = result
          })
        }
      })
    },
    removeImage (id) {
      removeImage(id, (error, result) => {
        if (error) {
          console.log(error)
        }
        this.images = []
        this.images = result
      })
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
