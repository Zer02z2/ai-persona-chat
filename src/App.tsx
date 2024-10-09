import { useEffect, useState } from "react"
import { ChatInput } from "./components/chat/chatInput"
import { onAuthStateChanged } from "firebase/auth"
import { SignIn } from "./firebase/signIn"
import { appAuth, User } from "./firebase/config"
import { SignOut } from "./firebase/signOut"
import { Portrait } from "./components/user/portrait"
import { ChatRoom } from "./components/chat/chatRoom"

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
    <div className="flex flex-col w-full h-screen p-6 font-sans max-w-screen-2xl">
      <section className="grid flex-1 grid-cols-8 gap-10 mb-6">
        <div className="col-span-2">
          <Portrait />
        </div>
        <div className="col-span-4">
          <ChatRoom />
        </div>
        <div className="flex flex-col justify-between col-span-2">
          {authState ? <SignOut /> : <div />}
          <Portrait />
        </div>
      </section>
      <section className="grid flex-none grid-cols-8 gap-10">
        <div className="col-span-2"></div>
        <div className="col-span-6">
          {authState ? <ChatInput /> : <SignIn />}
        </div>
      </section>
    </div>
  )
}
