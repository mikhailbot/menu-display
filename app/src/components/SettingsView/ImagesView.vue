<template>
  <div class="settings-view">

    <div class="list-images">
      <h2>Available Menuboards</h2>
      <div v-for="image in images" :key="image.filename">
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

    <h2>Upload New Menuboard</h2>
    <el-button type="primary" size="large" v-on:click="uploadNewImage()"><i class="el-icon-upload"></i> Upload Image or Video</el-button>
    <br>
    <br>
    <p>Please ensure images are in JPEG or PNG formats. For videos please ensure they are MP4 videos. If the video stutters or doesn't play back properly please reach out to Mikhail.</p>
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
              this.$message({
                message: 'Failed to upload image, please try again',
                type: 'error'
              })
            } else {
              this.$message({
                type: 'success',
                message: `Uploaded ${path.basename(filenames[0])}`
              })
              vm.images = []
              vm.images = result
            }
          })
        }
      })
    },
    removeImage (id) {
      this.$confirm('This will permanently delete the file as well as any schedule entries that point towards it. Continue?', 'Danger', {
        confirmButtonText: 'Delete Image and Schedules',
        confirmButtonClass: 'el-button--danger',
        cancelButtonText: 'Cancel',
        type: 'danger'
      }).then(() => {
        removeImage(id, (error, result) => {
          if (error) {
            console.log(error)
            this.$message({
              type: 'warning',
              message: 'Failed to remove image, please try again'
            })
          } else {
            this.$message({
              type: 'success',
              message: 'Removed image successfully'
            })
            this.images = []
            this.images = result
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    },
    setActiveImage (id) {
      setActive(id)
      this.$message({
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
