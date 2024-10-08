import { useEffect, useState } from "react"
import { ChatInput } from "./components/chat/chatInput"
import { onAuthStateChanged } from "firebase/auth"
import { SignIn } from "./firebase/signIn"
import { appAuth, User } from "./firebase/config"
import { SignOut } from "./firebase/signOut"

export default function App() {
  const [authState, setAuthState] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(appAuth, (user) => {
      console.log(user)
      setAuthState(user ? true : false)
      setUser(user ? { name: user.displayName, uid: user.uid } : null)
    })
    return unsubscribe
  }, [])
  return (
    <div className="w-full h-screen px-10 font-sans max-w-screen-2xl">
      <div className="grid h-full grid-cols-3">
        <div className="col-span-1"></div>
        <div className="flex flex-col col-span-2 pb-6 gap-y-6">
          <div className="grid h-full grid-cols-2">
            <div></div>
            <div className="border border-red-500">
              {authState ? <SignOut /> : <></>}
            </div>
          </div>
          {authState ? <ChatInput /> : <SignIn />}
        </div>
      </div>
    </div>
  )
}
