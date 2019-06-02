export default {
  setAlert(state, { title, description, type }) {
    state.alert = {
      title,
      type,
      description
    }
  },
  resetAlert(state) {
    state.alert = {}
  },
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
