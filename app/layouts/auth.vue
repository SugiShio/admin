<template lang="pug">
el-container
  el-main
    el-alert.mb-20(
    v-if='alert.title'
    :title='alert.title'
    :description='alert.description'
    :type='alert.type'
    @close='resetAlert'
    )
    nuxt
</template>
<script>
import firebase from '~/plugins/firebase'
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['alert'])
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch('setUser', { user })
    })
  },
  methods: {
    ...mapMutations(['resetAlert'])
  },
  watch: {
    $route(value) {
      this.resetAlert()
    }
  }
}
</script>
