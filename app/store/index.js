import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = () => ({
  isSignin: false,
  user: null
})

export default {
  state,
  mutations,
  actions,
  getters
}
