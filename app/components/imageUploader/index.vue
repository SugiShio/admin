<template lang="pug">
ul.m-imageuploader
  li.m-imageuploader__item(v-for='(image, i) in localImages')
    img.m-imageuploader__thumb(:src='image' @click='copyMDImageText(i)')
    el-input.mt-5(:value='`![](${image})`' ref='MDImageText' readonly)
  li.m-imageuploader__item
    label.m-imageuploader__label(
    @dragover.stop.prevent='handleDragover'
    @drop.stop.prevent='uploadFilesFromDnD'
    :disabled='uploading'
    )
      span
        i.mr-5(:class='label.icon')
        | {{ label.text }}
        input.m-imageuploader__fileinput(
        type='file'
        multiple
        @change='uploadFilesFromInput'
        :disabled='uploading'
        )

</template>

<script>
import { upload } from '~/utils/firebase'
import { getRandomString } from '~/utils/string'
export default {
  props: {
    images: { type: Array, default: () => [] }
  },
  data() {
    return {
      localImages: [],
      uploading: false
    }
  },
  computed: {
    label() {
      return this.uploading
        ? { icon: 'el-icon-loading', text: 'アップロード中' }
        : {
            icon: 'el-icon-upload2',
            text: '画像をアップロード'
          }
    }
  },
  created() {},
  methods: {
    uploadFilesFromDnD(event) {
      this.uploadFile(event.dataTransfer.files).then(result => {
        result.paths.forEach(path => {
          this.localImages.push(path)
        })
        this.$emit('image-updated', this.images)
      })
    },
    uploadFilesFromInput(event) {
      this.uploadFile(event.target.files).then(result => {
        result.paths.forEach(path => {
          this.localImages.push(path)
        })
        this.$emit('image-updated', this.images)
      })
    },
    async uploadFile(files) {
      this.uploading = true
      let paths = []
      for (let i = 0; i < files.length; i++) {
        const filname = getRandomString()
        const ext = files[i].name.match(/\.[a-z]*$/i)
        try {
          const path = '/images/' + filname + ext
          const imageUrl = await upload({ path, file: files[i] })
          paths.push(imageUrl)
          this.uploading = false
        } catch (error) {
          this.uploading = false
          throw error
        }
      }
      return { paths }
    },
    copyMDImageText(index) {
      this.$refs['MDImageText'][index].select()
      document.execCommand('copy')
    }
  },
  watch: {
    images() {
      this.localImages = this.images
    }
  }
}
</script>