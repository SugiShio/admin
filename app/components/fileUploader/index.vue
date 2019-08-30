<template lang="pug">
el-form-item
  .m-fileuploader
    .m-fileuploader__preview(
    v-for='file in files'
    )
      img(:src='file.src')
    label.m-fileuploader__label(
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
const reader = new FileReader()
export default {
  data() {
    return {
      files: [],
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
  created() {
    reader.onload = event => {
      this.files.push({ src: event.target.result })
    }
  },
  methods: {
    async uploadFile(files) {
      this.uploading = true
      let paths = []
      for (let i = 0; i < files.length; i++) {
        const filname = getRandomString()
        const ext = files[i].name.match(/\.[a-z]*$/i)
        try {
          const path = '/images/' + filname + ext
          await upload({ path, file: files[i] })
          this.uploading = false
          reader.readAsDataURL(files[i])
          paths.push(path)
        } catch (error) {
          this.uploading = false
          throw error
        }
      }
      return { paths }
    },
    uploadFilesFromDnD(event) {
      this.uploadFile(event.dataTransfer.files).then(result =>
        this.emitPath(result.paths)
      )
    },
    uploadFilesFromInput(event) {
      this.uploadFile(event.target.files).then(result =>
        this.emitPath(result.paths)
      )
    },
    handleDragover(event) {
      event.dataTransfer.dropEffect = 'copy'
    },
    emitPath(paths) {
      this.$emit('file-uploaded', paths)
    }
  }
}
</script>
