import firebase from "firebase/compat/app"
import firebaseui from "firebaseui"
import { useEffect } from "react"

export const Auth = () => {
  const ui = new firebaseui.auth.AuthUI(firebase.auth())

  useEffect(() => {
    ui.start("#firebaseui-auth-container", {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    })
  }, [])

  return (
    <div>
      <div id="firebaseui-auth-container"></div>
    </div>
  )
}
