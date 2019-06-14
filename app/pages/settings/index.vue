<template lang="pug">
section.m-page
  .m-page__header
    h2.m-page__title 設定
  el-form(label-width='120px')
</template>

<script>
import { getIndex } from '~/utils/firebase'
export default {
  data() {
    return {
      data: []
    }
  },
  async created() {
    this.data = await getIndex({
      collection: 'settings'
    })
    this.$store.commit('setIsLoading', { isLoading: false })
  }
}
</script>
