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
    <div className={`flex w-full gap-4 p-4`}>
      <img
        src={user.profileImage ? user.profileImage : "/questionMark.jpg"}
        className="overflow-hidden rounded-sm size-10"
      />
      <div className={`flex flex-col items-start`}>
        <p className="pb-2 text-xs text-neutral-300">
          {user.persona ? `${user.persona[0]} ${user.persona[1]}` : user.name}
        </p>

        <div className={`inline-block px-3 py-2 rounded-sm ${bgColor}`}>
          <p className="text-neutral-300">{message}</p>
        </div>
      </div>
    </div>
  )
}
