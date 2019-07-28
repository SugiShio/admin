<template lang="pug">
el-card(
  header='good evening'
  shadow='never'
  )
</template>

<script>
export default {
  created() {
    this.$store.commit('setIsLoading', { isLoading: false })
  }
}
</script>
