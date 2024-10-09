import {
  getDatabase,
  ref,
  onValue,
  Database,
  orderByChild,
  limitToFirst,
  query,
} from "firebase/database"
import { app, Message } from "../../firebase/config"
import { useEffect, useRef, useState } from "react"

export const ChatRoom = () => {
  const dbRef = useRef<Database | null>(null)
  const [chat, setChat] = useState<string[]>([])

  useEffect(() => {
    dbRef.current = getDatabase(app)
    if (!dbRef.current) {
      alert("Chat not loaded succesfully")
      return
    }
    const entriesRef = ref(dbRef.current, "ai-persona-chat/chatHistory")
    const myQuery = query(
      entriesRef,
      orderByChild("timeStamp"),
      limitToFirst(10)
    )
    onValue(myQuery, (snapshot) => {
      const data: { [name: string]: Message } = snapshot.val()
      const chatArr = Object.values(data).map((value) => value.message)
      setChat(chatArr)
    })
  }, [])
  return <div></div>
}
