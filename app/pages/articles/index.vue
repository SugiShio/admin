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
  :data='data'
  )
    el-table-column(
    prop='title'
    label='タイトル'
    )
    el-table-column(
    fixed='right'
    align='right'
    )
      template(slot-scope='scope')
        el-button(size='mini' icon='el-icon-edit' @click='toEdit(scope.row.title)')
        el-button(size='mini' icon='el-icon-delete' type='danger' @click='mDelete(scope.row.title)')

</template>

<script>
import { getIndex, deleteDoc } from '~/utils/firebase'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      data: []
    }
  },
  async created() {
    const data = await getIndex({
      collection: 'articles'
    })
    this.setIsLoading({ isLoading: false })
  },
  methods: {
    ...mapMutations(['setAlert', 'setIsLoading']),
    toEdit(title) {
      this.$router.push({
        name: 'articles-title',
        params: { title }
      })
    },
    async mDelete(title) {
      if (!window.confirm('削除しますか？')) return
      try {
        await deleteDoc({
          collection: 'articles',
          id: title
        })
        this.setAlert({
          title: '記事を削除しました',
          type: 'success'
        })
      } catch (e) {
        this.setAlert({
          title: '削除に失敗しました',
          description: e.toString(),
          type: 'error'
        })
      }
    }
  }
}
</script>
