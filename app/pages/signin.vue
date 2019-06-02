<template lang="pug">
  el-card(
  header='ログイン'
  shadow='never'
  )
    el-form(label-width='120px')
      el-form-item(label='メールアドレス')
        el-input(v-model='email')
      el-form-item(label='パスワード')
        el-input(
        v-model='password'
        show-password
        )
      el-form-item
        el-button(
        type='primary'
        size='small'
        @click='signin'
        ) ログイン
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  layout: 'auth',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch('setUser', { user })
    })
  },
  methods: {
    signin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.push('/admin')
        })
        .catch(error => {
          alert(error)
        })
    }
  }
}
</script>
