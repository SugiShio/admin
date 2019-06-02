import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = () => ({
  alert: {},
  colors: {
    header: {
      text: '#fff',
      background: '#d9333f'
    },
    menu: {
      text: '#302833',
      accent: '#d9333f',
      background: '#f3f3f2'
    }
  },
  isSignin: false,
  user: null
})

export default {
  state,
  mutations,
  actions,
  getters
}
