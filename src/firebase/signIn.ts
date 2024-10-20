import { signInWithPopup } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth/web-extension"
import { appAuth } from "./config"

export const signIn = async () => {
  const provider = new GoogleAuthProvider()
  try {
    await signInWithPopup(appAuth, provider)
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
