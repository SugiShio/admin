export default {
  setSignin(state) {
    state.isSignin = true
  },
  setSignout(state) {
    state.isSignin = false
  },
  setUser(state, { user }) {
    state.user = user
  }
}
