import { Chat, User } from "../../firebase/config"

export const ChatMessage = ({
  chat,
  user,
  isCurrentUser,
}: {
  chat: Chat
  user: User
  isCurrentUser: boolean
}) => {
  const { message } = chat
  const { name } = user
  return (
    <div className="p-2">
      <p className="pb-1 text-xs text-neutral-500">{name}</p>
      <div className="inline-block px-2 py-1 rounded-sm bg-neutral-300">
        <p className="text-neutral-700">{message}</p>
      </div>
    </div>
  )
}
