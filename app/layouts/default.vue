<template lang="pug">
el-container
  el-header(height='auto')
    .m-header
      router-link(:to='{ name: "index" }')
        .m-header__logo logo
      el-dropdown(@command='handleCommand')
        span.m-header__item
          | {{ label }}
          i.el-icon-arrow-down.el-icon--right
        el-dropdown-menu(slot='dropdown')
          el-dropdown-item(command='signout') ログアウト
  el-container
    el-aside
      el-menu(router)
        el-menu-item(index='/articles') 記事
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
    handleCommand(command) {
      this[command]()
    },
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
