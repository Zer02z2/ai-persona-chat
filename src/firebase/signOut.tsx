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
    <div className="flex justify-end w-full">
      <div className="px-2 py-1 rounded-sm bg-neutral-900">
        <button onClick={signOutSession} className="text-neutral-400">
          Sign Out
        </button>
      </div>
    </div>
  )
}
