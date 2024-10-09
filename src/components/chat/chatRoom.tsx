import {
  getDatabase,
  ref,
  onValue,
  Database,
  orderByChild,
  query,
  limitToLast,
} from "firebase/database"
import { app, Chat, User, Users } from "../../firebase/config"
import { Fragment, useEffect, useRef, useState } from "react"
import { ChatMessage } from "./chatMessage"

export const ChatRoom = ({
  users,
  currentUser,
}: {
  users: Users | null
  currentUser: User | null
}) => {
  const dbRef = useRef<Database | null>(null)
  const [chatHistory, setChatHistory] = useState<Chat[]>([])

  useEffect(() => {
    dbRef.current = getDatabase(app)
    if (!dbRef.current) {
      alert("Chat not loaded succesfully")
      return
    }
    const entriesRef = ref(dbRef.current, "ai-persona-chat/chatHistory")
    const chatQuery = query(
      entriesRef,
      orderByChild("timeStamp"),
      limitToLast(10)
    )
    onValue(chatQuery, (snapshot) => {
      const data: { [name: string]: Chat } = snapshot.val()
      const chatArr: Chat[] = Object.values(data)
      setChatHistory(chatArr)
    })
  }, [])

  const chatMessages = chatHistory.map((chat, index) => {
    if (!users) return
    const user = users[chat.uid]
    return (
      <Fragment key={index}>
        <ChatMessage chat={chat} user={user} isCurrentUser={false}/>
      </Fragment>
    )
  })
  return (
    <div className="h-full overflow-hidden">
      <div
        className="h-full overflow-scroll max-h-[80vh]"
        style={{ width: "calc(100% + 17px)" }}
      >
        {chatMessages}
      </div>
    </div>
  )
}
