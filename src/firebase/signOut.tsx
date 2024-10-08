import { signOut } from "firebase/auth"
import { appAuth } from "./config"

export const SignOut = () => {
  const signOutSession = async () => {
    try {
      await signOut(appAuth)
      console.log("sign out successful")
    } catch (error: any) {}
  }
  return (
    <div>
      <button onClick={signOutSession}>Sign Out</button>
    </div>
  )
}
