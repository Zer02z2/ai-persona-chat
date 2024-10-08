import { useEffect, useState } from "react"
import { ChatInput } from "./components/chat/chatInput"
import { onAuthStateChanged } from "firebase/auth"
import { SignIn } from "./firebase/signIn"
import { app, appAuth, User, Users } from "./firebase/config"
import { SignOut } from "./firebase/signOut"
import { Portrait } from "./components/user/portrait"
import { ChatRoom } from "./components/chat/chatRoom"
import { getDatabase, onValue, ref } from "firebase/database"
// import { CreateUser } from "./components/user/createUser"

export default function App() {
  const [authState, setAuthState] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<Users | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(appAuth, (user) => {
      setAuthState(user ? true : false)
      setUser(user ? { name: user.displayName, uid: user.uid } : null)
    })
    const db = getDatabase(app)
    onValue(ref(db, "ai-persona-chat/users"), (snapshot) => {
      const data: Users = snapshot.val()
      setUsers(data)
    })
    return unsubscribe
  }, [])
  return (
    <div className="flex flex-col w-full h-screen p-6 font-sans max-w-screen-2xl">
      <section className="grid flex-1 grid-cols-8 gap-10 mb-6">
        <div className="col-span-2">
          <Portrait user={user} />
        </div>
        <div className="col-span-4">
          <ChatRoom users={users} currentUser={user} />
        </div>
        <div className="flex flex-col justify-between col-span-2">
          {authState ? <SignOut /> : <SignIn />}
          <Portrait user={user} />
        </div>
      </section>
      <section className="grid flex-none grid-cols-8 gap-10">
        <div className="col-span-2"></div>
        <div className="col-span-6">
          <ChatInput user={user} />
        </div>
      </section>
      {/* <CreateUser /> */}
    </div>
  )
}
