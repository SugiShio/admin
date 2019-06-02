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
    .then(() => {})
    .catch(e => {
      // todo
      return e
    })
  return result
}
