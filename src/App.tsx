import { useEffect, useState } from "react"
import { ChatInput } from "./components/chat/chatInput"
import { onAuthStateChanged } from "firebase/auth"
import { SignInButton } from "./components/user/signInButton"
import { app, appAuth, User, Users } from "./firebase/config"
import { SignOutButton } from "./components/user/signOutButton"
import { Portrait } from "./components/user/portrait"
import { ChatRoom } from "./components/chat/chatRoom"
import { getDatabase, onValue, ref } from "firebase/database"
import { EditUser } from "./components/user/edit/editUser"
import { UserCenter } from "./components/user/userCenter"
import { signOutSession } from "./firebase/signOut"

export default function App() {
  const [authState, setAuthState] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<Users | null>(null)
  const [editMode, setEditMode] = useState<boolean>(false)

  const handleAuthState = async () => {
    if (!user) {
      setAuthState(false)
      return
    }
    if (!users) {
      await signOutSession()
      setAuthState(false)
      alert("Sign in failed, please try again.")
      return
    }
    setAuthState(true)
    if (
      users[user.uid] &&
      users[user.uid].persona &&
      users[user.uid].profileImage
    ) {
      setUser(users[user.uid])
      return
    }
    setEditMode(true)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(appAuth, (user) => {
      setUser(user ? { uid: user.uid, name: user.displayName } : null)
    })
    const db = getDatabase(app)
    onValue(ref(db, "ai-persona-chat/users"), (snapshot) => {
      const data: Users = snapshot.val()
      setUsers(data)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    handleAuthState()
  }, [user, users])

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
          <div className="flex justify-end w-full gap-x-4">
            {authState ? <SignOutButton /> : <SignInButton />}
          </div>
          <div>
            {authState ? (
              <UserCenter user={user} setEditMode={setEditMode} />
            ) : (
              <></>
            )}
            <Portrait user={user} />
          </div>
        </div>
      </section>
      <section className="grid flex-none grid-cols-8 gap-10">
        <div className="col-span-2"></div>
        <div className="col-span-6">
          {authState && <ChatInput user={user} />}
        </div>
      </section>
      {editMode && user && <EditUser user={user} />}
    </div>
  )
}
