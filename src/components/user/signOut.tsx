import { signOut } from "firebase/auth"
import { appAuth } from "../../firebase/config"

export const SignOut = () => {
  const signOutSession = async () => {
    try {
      await signOut(appAuth)
      console.log("sign out successful")
    } catch (error: any) {
      alert(error)
    }
  }
  return (
    <div className="px-4 py-1 rounded-full cursor-pointer bg-neutral-900 hover:bg-red-500">
      <button onClick={signOutSession} className="font-medium text-neutral-300">
        Sign Out
      </button>
    </div>
  )
}
