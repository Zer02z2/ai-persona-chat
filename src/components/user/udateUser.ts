import { getDatabase, ref, set } from "firebase/database"
import { app, User } from "../../firebase/config"

export const updateUser = (user: User) => {
  const db = getDatabase(app)
  set(ref(db, `ai-persona-chat/users/${user.uid}`), {
    uid: user.uid,
    name: user.name,
  })
}
