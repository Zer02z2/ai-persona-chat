import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useEffect, useRef } from "react"
import { appAuth } from "../../firebase/config"

export const SignIn = () => {
  const providerRef = useRef<GoogleAuthProvider | null>(null)

  useEffect(() => {
    providerRef.current = new GoogleAuthProvider()
  }, [])

  const signIn = async () => {
    if (!providerRef.current) return
    try {
      await signInWithPopup(appAuth, providerRef.current)
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
    <div className="px-4 py-1 rounded-full bg-amber-200 hover:cursor-pointer">
      <button onClick={signIn} className="font-medium text-neutral-700">
        Sign In
      </button>
    </div>
  )
}
