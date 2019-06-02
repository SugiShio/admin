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
    el-button(
    size='mini'
    @click='create'
    ) 作成
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      title: '',
      body: ''
    }
  },
  methods: {
    async create() {
      const data = await this.$store.dispatch('create', {
        collection: 'articles',
        id: this.title,
        data: {
          title: this.title,
          body: this.body,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    }
  }
}
</script>
