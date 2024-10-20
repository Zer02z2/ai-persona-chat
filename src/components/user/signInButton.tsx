import { signIn } from "../../firebase/signIn"

export const SignInButton = () => {
  return (
    <div className="px-4 py-1 rounded-full bg-amber-200 hover:cursor-pointer">
      <button onClick={signIn} className="font-medium text-neutral-700">
        Sign In
      </button>
    </div>
  )
}
