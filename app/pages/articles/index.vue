<template lang="pug">
section.m-page
  .m-page__header
    h2.m-page__title 記事一覧
    router-link(:to='{ name: "articles-new" }')
      el-button(
      size='mini'
      icon='el-icon-plus'
      ) 新規投稿
  el-table(
  v-loading='isLoading'
  :data='data'
  )
    el-table-column(
    prop='title'
    label='タイトル'
    )
</template>

<script>
import { getIndex } from '~/utils/firebase'
export default {
  data() {
    return {
      data: [],
      isLoading: true
    }
  },
  async created() {
    const data = await getIndex({
      collection: 'articles'
    })
    this.data = data.map(v => {
      const createdAt =
        v.createdAt.seconds * 1000 + v.createdAt.nanoseconds / 1000000
      const updatedAt =
        v.updatedAt.seconds * 1000 + v.updatedAt.nanoseconds / 1000000
      return { ...v, createdAt, updatedAt }
    })
    this.isLoading = false
  }
}
</script>
