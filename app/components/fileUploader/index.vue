<template lang="pug">
el-form-item
  label.m-fileuploader(
  @dragover.stop.prevent='handleDragover'
  @drop.stop.prevent='uploadFilesFromDnD'
  :disabled='uploading'
  )
    i.mr-5(:class='label.icon')
    | {{ label.text }}
    input(
    type='file'
    multiple
    :disabled='uploading'
    @change='uploadFilesFromInput'
    )
</template>

<script>
import { upload } from '~/utils/firebase'
import { getRandomString } from '~/utils/string'
export default {
  data() {
    return {
      uploading: false
    }
  },
  computed: {
    label() {
      return this.uploading
        ? { icon: 'el-icon-loading', text: 'アップロード中' }
        : {
            icon: 'el-icon-upload2',
            text: 'ドラッグ&ドロップで画像をアップロード'
          }
    }
  },
  methods: {
    async uploadFile(files) {
      this.uploading = true
      for (let i = 0; i < files.length; i++) {
        const filname = getRandomString()
        const ext = files[i].name.match(/\.[a-z]*$/i)
        try {
          await upload({ path: '/images/' + filname + ext, file: files[i] })
          this.uploading = false
        } catch (error) {
          this.uploading = false
          throw error
        }
      }
    },
    uploadFilesFromDnD(event) {
      this.uploadFile(event.dataTransfer.files)
    },
    uploadFilesFromInput(event) {
      this.uploadFile(event.target.files)
    },
    handleDragover(event) {
      event.dataTransfer.dropEffect = 'copy'
    }
  }
}
</script>
