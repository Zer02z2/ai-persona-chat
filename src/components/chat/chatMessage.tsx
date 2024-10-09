import { Chat } from "../../firebase/config"

export const ChatMessage = ({ props }: { props: Chat }) => {
  const { message, uid } = props
  return (
    <div className="p-2">
      <div className="inline-block px-2 py-1 rounded-sm bg-neutral-300">
        <p className="text-neutral-700">{message}</p>
      </div>
    </div>
  )
}
