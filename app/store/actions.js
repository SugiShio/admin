import firebase from '~/plugins/firebase'
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
  },

  async getIndex({}, { collection }) {
    let data = []
    await firebase
      .firestore()
      .collection(collection)
      .orderBy('createdAt', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          data.push(doc.data())
        })
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error)
      })
    return data
  },

  create({}, { collection, id, data }) {
    firebase
      .firestore()
      .collection(collection)
      .doc(id)
      .set(data)
      .then(() => {})
      .catch(e => {
        // todo
        return e
      })
  }
}
