import {
  getDatabase,
  push,
  ref,
  Database,
  serverTimestamp,
} from "firebase/database"
import { useEffect, useRef, useState } from "react"
import { app, User } from "../../firebase/config"

export const ChatInput = ({ user }: { user: User }) => {
  const dbRef = useRef<Database | null>(null)
  const [input, setInput] = useState<string>("")

  useEffect(() => {
    dbRef.current = getDatabase(app)
  }, [])
  const sendChat = (message: string) => {
    if (!dbRef.current) return
    push(ref(dbRef.current, "ai-persona-chat/chatHistory"), {
      message: message,
      timeStamp: serverTimestamp(),
      uid: user.uid,
    })
  }
  return (
    <div className="flex h-12 rounded-sm bg-neutral-700">
      <input
        type="text"
        className="w-full h-full px-4 bg-transparent text-neutral-300 focus:outline-none"
        placeholder="Message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter" || !dbRef.current) return
          sendChat(input)
          setInput("")
        }}
      ></input>
      <div
        className="grid h-full px-4 cursor-pointer place-items-center"
        onClick={() => {
          if (!dbRef.current) return
          sendChat(input)
          setInput("")
        }}
      >
        <img src="/send.svg" className="size-6"></img>
      </div>
    </div>
  )
}
