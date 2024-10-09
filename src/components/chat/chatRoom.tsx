import {
  getDatabase,
  ref,
  onValue,
  Database,
  orderByChild,
  query,
  limitToLast,
} from "firebase/database"
import { app, Chat } from "../../firebase/config"
import { Fragment, useEffect, useRef, useState } from "react"
import { ChatMessage } from "./chatMessage"

export const ChatRoom = () => {
  const dbRef = useRef<Database | null>(null)
  const [chat, setChat] = useState<Chat[]>([])

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
      setChat(chatArr)
    })
  }, [])

  const chatMessages = chat.map((entry, index) => {
    return (
      <Fragment key={index}>
        <ChatMessage props={entry} />
      </Fragment>
    )
  })
  return <div>{chatMessages}</div>
}
