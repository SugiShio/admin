<template lang="pug">
el-form(label-width='120px')
  el-form-item(label='タイトル')
    el-input(
    v-model='title'
    )
  el-form-item(label='本文')
    el-input(
    v-model='body'
    type='textarea'
    :autosize='{ minRows: 4, maxRows: 12}'
    )
  el-form-item
    el-checkbox(v-model='draft') 下書き
  el-form-item
    el-button(
    size='mini'
    @click='create'
    ) 作成
</template>

<script>
import { create } from '~/utils/firebase'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      title: '',
      body: '',
      draft: false
    }
  },
  methods: {
    ...mapMutations(['setAlert']),
    async create() {
      if (!this.title && !this.body) return
      try {
        const data = await create({
          collection: 'articles',
          id: this.title,
          data: {
            title: this.title,
            body: this.body,
            published: !this.draft,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        })
        this.setAlert({
          title: '記事を作成しました',
          type: 'success'
        })
      } catch (e) {
        this.setAlert({
          title: '記事作成に失敗しました',
          description: e.toString(),
          type: 'error'
        })
      }
    }
  }
}
</script>
