import "./style.css"

export const CreateUser = () => {
  return (
    <div className="fixed top-0 left-0 grid w-screen h-screen place-items-center backdrop-blur-md">
      <div className="p-6 rounded-sm bg-neutral-100 w-[30rem]">
        <h1 className="pb-4 text-xl font-medium text-neutral-800">
          Create your persona:
        </h1>
        <div className="w-full aspect-[1/1] rounded-sm overflow-hidden mb-4">
          <img src="questionMark.jpg" className="object-cover min-h-full"></img>
        </div>
        <h2 className="pb-2 text-lg font-medium text-neutral-600">You are a</h2>
        <div className="flex justify-between pb-6 text-lg font-medium text-neutral-600">
          <input type="text" placeholder="adj."></input>
          <input type="text" placeholder="noun."></input>
        </div>
        <div className="flex justify-end gap-2">
          <button className="bg-amber-300">Generate image</button>
          <button className="bg-green-600">Save</button>
        </div>
      </div>
    </div>
  )
}
