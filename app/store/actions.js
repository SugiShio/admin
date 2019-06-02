import Cookies from 'universal-cookie'
export default {
  setUser({ commit }, { user }) {
    const cookies = new Cookies()
    if (user) {
      user = {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid
      }
      commit('setUser', { user })
      commit('setSignin')
      cookies.set('credential', true)
    } else {
      commit('setUser', {})
      commit('setSignout')
      cookies.remove('credential')
    }
  }
}
