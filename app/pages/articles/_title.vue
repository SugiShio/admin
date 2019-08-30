<template lang="pug">
el-form(label-width='120px')
  el-form-item(label='タイトル')
    el-input(
    v-model='data.title'
    )
  el-form-item(label='本文')
    el-input#body(
    v-model='data.body'
    type='textarea'
    :autosize='{ minRows: 4, maxRows: 12}'
    v-loading='uploading'
    )
    input(
    type='file'
    multiple
    @change='uploadFilesFromInput'
    :disabled='uploading'
    )
  el-form-item
    el-checkbox(v-model='data.draft') 下書き
  el-form-item
    el-button(
    size='mini'
    @click='update'
    ) 更新
</template>

<script>
import { mapMutations } from 'vuex'
import { getShow, update, upload } from '~/utils/firebase'
import { getRandomString } from '~/utils/string'
export default {
  data() {
    return {
      data: {},
      uploading: false
    }
  },
  async created() {
    try {
      this.data = await getShow({
        collection: 'articles',
        doc: this.$route.params.title
      })
      this.data.draft = this.data.published
      this.setIsLoading({ isLoading: false })
    } catch (e) {
      this.setIsLoading({ isLoading: false })
      this.setAlert({
        title: '記事取得に失敗しました',
        description: e.toString(),
        type: 'error'
      })
    }
  },
  mounted() {
    document.getElementById('body').addEventListener('dragover', event => {
      event.stopPropagation()
      event.preventDefault()
      event.dataTransfer.dropEffect = 'copy'
    })
    document.getElementById('body').addEventListener('drop', event => {
      event.stopPropagation()
      event.preventDefault()
      this.uploadFilesFromDnD(event)
    })
  },
  methods: {
    ...mapMutations(['setAlert', 'setIsLoading']),
    async update() {
      if (!this.data.title && !this.data.body) return
      try {
        const data = await update({
          collection: 'articles',
          id: this.data.title,
          data: {
            title: this.data.title,
            body: this.data.body,
            published: !this.data.draft,
            images: this.data.images
          }
        })
        this.setAlert({
          title: '記事更新に成功しました',
          type: 'success'
        })
      } catch (e) {
        this.setAlert({
          title: '記事更新に失敗しました',
          description: e.toString(),
          type: 'error'
        })
      }
    },
    uploadFilesFromDnD(event) {
      this.uploadFile(event.dataTransfer.files).then(result => {
        result.paths.forEach(path => {
          this.data.body += `\n![](${path})`
        })
      })
    },
    uploadFilesFromInput(event) {
      this.uploadFile(event.target.files).then(result => {
        result.paths.forEach(path => {
          this.data.body += `\n![](${path})`
        })
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
    }
  }
}
</script>
