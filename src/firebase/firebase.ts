import firebase from 'firebase/app'
import config from './config'
import { _fbDbRef, _fbUsersCol } from '../consts'

import 'firebase/database'
import 'firebase/firestore'

const app = firebase.initializeApp(config)

const DBRef = app.database().ref().child(_fbDbRef)
const UsersCol = app.firestore().collection(_fbUsersCol)

export { DBRef, UsersCol }