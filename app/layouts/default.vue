<template lang="pug">
el-container.m-container
  el-header(
  height='auto'
  :style='styles.header'
  )
    .m-header
      router-link(:to='{ name: "index" }')
        .m-header__logo(:style='styles.item') logo
      el-dropdown(
      @command='handleCommand'
      :style='styles.item'
      )
        span.m-header__item
          | {{ label }}
          i.el-icon-arrow-down.el-icon--right
        el-dropdown-menu(slot='dropdown')
          el-dropdown-item.m-dropdown__item(command='signout') ログアウト
  el-container
    el-aside(:style='styles.aside')
      el-menu(
      router
      default-active='/articles'
      :background-color='colors.menu.background'
      :text-color='colors.menu.text'
      :active-text-color='colors.menu.accent'
      )
        el-menu-item(index='/articles') 記事
        el-menu-item(index='/settings') 設定
    el-main.m-main
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
    ...mapGetters(['alert', 'colors', 'user']),
    label() {
      if (!this.user) return
      return this.user.displayName || this.user.email
    },
    styles() {
      return {
        header: { 'background-color': this.colors.header.background },
        aside: { 'background-color': this.colors.menu.background },
        item: { color: this.colors.header.text }
      }
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
