import { ChatInput } from "./components/chat/chatInput"

export default function App() {
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
