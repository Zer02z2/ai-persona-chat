// import firebase from "firebase/compat/app"
// import * as firebaseui from "firebaseui"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useEffect, useRef } from "react"
import { appAuth } from "./config"

export const SignIn = () => {
  const providerRef = useRef<GoogleAuthProvider | null>(null)
  useEffect(() => {
    providerRef.current = new GoogleAuthProvider()
  }, [])

  const signIn = async () => {
    if (!providerRef.current) return
    try {
      const result = await signInWithPopup(appAuth, providerRef.current)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      const user = result.user
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.customData.email
      const credential = GoogleAuthProvider.credentialFromError(error)
    }
  }

  return (
    <div>
      <button onClick={signIn}>Sign in</button>
    </div>
  )
}
