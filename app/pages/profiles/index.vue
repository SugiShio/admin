<template lang="pug">
section.m-page
  .m-page__header
    h2.m-page__title プロフィール
  el-form(
  label-width='120px'
  label-position='left'
  v-for='item in items'
  :key='item.key'
  )
    editor(:item='item')
</template>

<script>
import { getIndex } from '~/utils/firebase'
import editor from '~/components/editor'
import { mapMutations } from 'vuex'
export default {
  components: { editor },
  data() {
    return {
      items: [],
      isLoading: true
    }
  },
  async created() {
    this.items = await getIndex({
      collection: 'profiles',
      order: 'asc'
    })
    this.setIsLoading({ isLoading: false })
  },
  methods: {
    ...mapMutations(['setIsLoading'])
  }
}
</script>
