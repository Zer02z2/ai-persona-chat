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
  const alignment = isCurrentUser ? "flex-row-reverse" : "flex-row"
  const textAlignment = isCurrentUser ? "items-end" : "items-start"
  const bgColor = isCurrentUser ? "bg-neutral-900" : "bg-neutral-700"

  return (
    <div className={`flex w-full gap-4 p-4 ${alignment}`}>
      {!isCurrentUser && (
        <div className="rounded-sm size-10 bg-neutral-300"></div>
      )}
      <div className={`flex flex-col ${textAlignment}`}>
        {!isCurrentUser && (
          <p className="pb-2 text-xs text-neutral-300">{name}</p>
        )}
        <div className={`inline-block px-3 py-2 rounded-sm ${bgColor}`}>
          <p className="text-neutral-300">{message}</p>
        </div>
      </div>
    </div>
  )
}
