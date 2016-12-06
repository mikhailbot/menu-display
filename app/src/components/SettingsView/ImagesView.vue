<template>
  <div class="settings-view">

    <div class="list-images">
      <h3>Available Images</h3>
      <div v-for="image in images">
        <div class="image">
          <div class="image-name">{{ image.filename }}</div>
          <div class="image-buttons">
            <span v-if="settings.activeImage == image.id">
              <el-button type="success" size="small" icon="star-on"> Active </el-button>
              <el-button type="danger" size="small" icon="delete" :disabled="true"> Delete </el-button>
            </span>
            <span v-else>
              <el-button type="default" size="small" icon="star-off" v-on:click="setActiveImage(image.id)">Make Active</el-button>
              <el-button type="danger" size="small" icon="delete" v-on:click="removeImage(image.id)"> Delete </el-button>
            </span>
          </div>
        </div>
      </div>
    </div>

    <h3>Upload New Menuboard</h3>
    <el-button type="primary" size="large" v-on:click="uploadNewImage()"><i class="el-icon-upload"></i> Upload Image</el-button>
  </div>
</template>

<script>
import path from 'path'
import { remote } from 'electron'
import { getSettings, getImages, uploadImage, removeImage, setActive } from '../../database'

const dialog = remote.dialog

export default {
  name: 'settings-images',

  beforeMount () {
    this.getImagesList()
    this.settings = getSettings()
  },

  data () {
    return {
      images: [],
      settings: {}
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
              this.$notify({
                message: 'Failed to upload image, please try again',
                type: 'error'
              })
            } else {
              this.$notify({
                title: 'Upload Successful',
                message: `Uploaded ${path.basename(filenames[0])}`,
                type: 'success'
              })

              vm.images = []
              vm.images = result
            }
          })
        }
      })
    },
    removeImage (id) {
      removeImage(id, (error, result) => {
        if (error) {
          console.log(error)
          this.$notify({
            message: 'Failed to remove image, please try again',
            type: 'error'
          })
        } else {
          this.$notify({
            message: 'Removed image successfully',
            type: 'success'
          })
          this.images = []
          this.images = result
        }
      })
    },
    setActiveImage (id) {
      setActive(id)
      this.$notify({
        message: 'New active image set',
        type: 'success'
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
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
}

.image-name {
  width: 50%;
}

.image-buttons button {
  width: 7rem;
}
</style>
