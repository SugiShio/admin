<template lang="pug">
el-container
  el-header
    el-button(
    v-if='label'
    @click='signout'
    type='text'
    ) ログアウト
    | {{ label }}
  el-container
    el-aside
      el-menu(router)
        el-menu-item(index='articles') 記事
    el-main
      el-alert.mb-20(
      v-if='alert.title'
      :title='alert.title'
      :description='alert.description'
      :type='alert.type'
      ref='alert'
      @close='resetAlert'
      )
      nuxt
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['user', 'alert']),
    label() {
      if (!this.user) return
      return this.user.displayName || this.user.email
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch('setUser', { user })
    })
  },
  methods: {
    ...mapMutations(['resetAlert']),
    signout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/signin')
        })
        .catch(error => {
          alert(error)
        })
    }
  },
  watch: {
    $route(value) {
      this.resetAlert()
    }
  }
}
</script>
