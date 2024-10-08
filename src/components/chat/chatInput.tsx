export const ChatInput = () => {
  return (
    <div className="flex rounded-sm bg-neutral-700">
      <input
        type="text"
        className="w-full h-12 px-4 text-white bg-transparent focus:outline-none"
      ></input>
      <div className="grid h-full px-4 place-items-center">
        <img src="/send.svg" className="size-6"></img>
      </div>
    </div>
  )
}
