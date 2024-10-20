import { signOut } from "firebase/auth"
import { appAuth } from "./config"

export const signOutSession = async () => {
  try {
    await signOut(appAuth)
    console.log("sign out successful")
  } catch (error: any) {
    alert(error)
  }
}
