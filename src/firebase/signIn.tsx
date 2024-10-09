import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useEffect, useRef } from "react"
import { appAuth, User } from "./config"
import { updateUser } from "../components/user/udateUser"

export const SignIn = () => {
  const providerRef = useRef<GoogleAuthProvider | null>(null)

  useEffect(() => {
    providerRef.current = new GoogleAuthProvider()
  }, [])

  const signIn = async () => {
    if (!providerRef.current) return
    try {
      const result = await signInWithPopup(appAuth, providerRef.current)
      const user = result.user
      const myUser: User = { name: user.displayName, uid: user.uid }
      updateUser(myUser)
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.customData.email
      const credential = GoogleAuthProvider.credentialFromError(error)
      alert(
        `Error code: ${errorCode}.\nErorMessage: ${errorMessage}.\nEmail: ${email}.\nCredentail: ${credential}.`
      )
    }
  }

  return (
    <div>
      <button onClick={signIn}>Sign in</button>
    </div>
  )
}
