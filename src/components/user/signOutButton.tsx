import { signOutSession } from "../../firebase/signOut"

export const SignOutButton = () => {
  return (
    <div className="px-4 py-1 rounded-full cursor-pointer bg-neutral-900 hover:bg-red-500">
      <button onClick={signOutSession} className="font-medium text-neutral-300">
        Sign Out
      </button>
    </div>
  )
}
