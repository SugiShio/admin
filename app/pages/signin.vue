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
        :loading='isLoading'
        ) ログイン
</template>

<script>
import { signin } from '~/utils/firebase'
import { mapMutations } from 'vuex'
export default {
  layout: 'auth',
  data() {
    return {
      email: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
    ...mapMutations(['setAlert']),
    async signin() {
      this.isLoading = true
      try {
        await signin({
          email: this.email,
          password: this.password
        })
        this.$router.push('/')
      } catch (e) {
        this.isLoading = false
        this.setAlert({
          title: 'ログインに失敗しました',
          description: e.toString(),
          type: 'error'
        })
      }
    }
  }
}
</script>
