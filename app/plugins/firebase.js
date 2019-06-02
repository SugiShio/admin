import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBXusO9zlJnpteR1aHSHNeJlb0khdJGjKk',
    authDomain: 'site-f5326.firebaseapp.com',
    databaseURL: 'https://site-f5326.firebaseio.com',
    projectId: 'site-f5326',
    storageBucket: 'site-f5326.appspot.com',
    messagingSenderId: '742654625548',
    appId: '1:742654625548:web:4a7b75747b961899'
  })
}

export default firebase
