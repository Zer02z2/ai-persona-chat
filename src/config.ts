import { initializeApp } from "firebase/app"

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

export const app = initializeApp(firebaseConfig)
