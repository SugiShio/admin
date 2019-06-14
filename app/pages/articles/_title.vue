<template lang="pug">
el-form(label-width='120px')
  el-form-item(label='タイトル')
    el-input(
    v-model='data.title'
    )
  el-form-item(label='本文')
    el-input(
    v-model='data.body'
    type='textarea'
    :autosize='{ minRows: 4, maxRows: 12}'
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
import { getShow, update } from '~/utils/firebase'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      title: '',
      body: '',
      draft: false,
      data: {}
    }
  },
  async created() {
    try {
      const data = await getShow({
        collection: 'articles',
        doc: this.$route.params.title
      })
      this.data = data
      this.data.draft = !data.published
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
            published: !this.data.draft
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
    }
  }
}
</script>
