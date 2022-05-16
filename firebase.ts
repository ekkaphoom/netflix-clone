// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBj-0pVC1ykEVJcq1aILH8iXMKABkJElpY',
  authDomain: 'netflix-clone-edd1e.firebaseapp.com',
  projectId: 'netflix-clone-edd1e',
  storageBucket: 'netflix-clone-edd1e.appspot.com',
  messagingSenderId: '921253957621',
  appId: '1:921253957621:web:1aa9ae3aab2c99acbf1abc',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
