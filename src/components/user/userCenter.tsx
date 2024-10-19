import { User } from "../../firebase/config"

export const UserCenter = ({
  user,
  setEditMode,
}: {
  user: User | null
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  console.log("1: ", user)
  return (
    <div className="pb-4">
      {user && (
        <div className="flex items-center justify-end gap-x-4">
          <h1 className="text-xl font-medium text-neutral-300">{user.name}</h1>
          <div className="px-2 py-0 rounded-full cursor-pointer bg-neutral-700 hover:bg-blue-600">
            <button
              className="font-normal text-neutral-300"
              onClick={() => {
                setEditMode(true)
              }}
            >
              edit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
