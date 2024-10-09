import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDqFi7218etGhPFwDrOShbUl1fC9sfIdP8",
  authDomain: "shared-minds-23690.firebaseapp.com",
  databaseURL: "https://shared-minds-23690-default-rtdb.firebaseio.com",
  projectId: "shared-minds-23690",
  storageBucket: "shared-minds-23690.appspot.com",
  messagingSenderId: "573703240356",
  appId: "1:573703240356:web:837a57c9010b1f2f880431",
  measurementId: "G-6G5SQVR98Y",
}

const app = initializeApp(firebaseConfig)
const appAuth = getAuth(app)

export { app, appAuth }

export interface User {
  name: string | null
  uid: string | null
}

export interface Users {
  [id: string]: User
}

export interface Chat {
  message: string
  timeStamp: number
  uid: string
}
