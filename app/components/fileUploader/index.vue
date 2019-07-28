<template lang="pug">
el-form-item
  label.m-fileuploader(
  @dragover.stop.prevent='handleDragover'
  @drop.stop.prevent='uploadFilesFromDnD'
  )
    | ドラッグ&ドロップで画像を選択
    input(
    type='file'
    multiple
    @change='uploadFilesFromInput'
    )
</template>

<script>
import { upload } from '~/utils/firebase'
import { getRandomString } from '~/utils/string'
export default {
  methods: {
    uploadFile(files) {
      for (let i = 0; i < files.length; i++) {
        const filname = getRandomString()
        const ext = files[i].name.match(/\.[a-z]*$/i)
        try {
          upload({ path: '/images/' + filname + ext, file: files[i] })
        } catch (error) {
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
