import { useEffect, useState } from "react"
import { ChatInput } from "./components/chat/chatInput"
import { onAuthStateChanged } from "firebase/auth"
import { appAuth } from "./firebase/config"

export default function App() {
  const [auth, setAuth] = useState<boolean>(false)
  const [uid, setUid] = useState<string | null>(null)

  useEffect(() => {
    onAuthStateChanged(appAuth, (user) => {
      setAuth(user ? true : false)
      setUid(user ? user.uid : null)
    })
  }, [])
  return (
    <div className="w-full h-screen px-10 font-sans max-w-screen-2xl">
      <div className="grid h-full grid-cols-3">
        <div className="col-span-1"></div>
        <div className="flex flex-col col-span-2 pb-6 gap-y-6">
          <div className="h-full"></div>
          <ChatInput />
        </div>
      </div>
    </div>
  )
}
