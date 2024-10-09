import { signOut } from "firebase/auth"
import { appAuth } from "./config"

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
    <div className="flex justify-end w-full">
      <div className="px-2 py-1 rounded-sm bg-neutral-900">
        <button
          onClick={signOutSession}
          className="font-medium text-neutral-400"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
