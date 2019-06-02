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
      nuxt
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  computed: {
    label() {
      const user = this.$store.getters.user || {}
      return user.displayName || user.email
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch('setUser', { user })
    })
  },
  methods: {
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
  }
}
</script>
