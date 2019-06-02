import firebase from '~/plugins/firebase'

export const getIndex = async ({ collection }) => {
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
}

export const create = async ({ collection, id, data }) => {
  const result = await firebase
    .firestore()
    .collection(collection)
    .doc(id)
    .set(data)
    .catch(error => {
      throw error
    })
  return result
}

export const signin = async ({ email, password }) => {
  const result = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
      throw error
    })
}
