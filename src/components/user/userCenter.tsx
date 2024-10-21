import { User } from "../../firebase/config"

export const UserCenter = ({
  user,
  setEditMode,
}: {
  user: User | null
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    user && (
      <div className="p-4 rounded-sm bg-none">
        <div className="flex items-center justify-between gap-x-4">
          <h1 className="text-xl font-medium text-neutral-300">{`${user.name}, the`}</h1>
          <button
            className="px-2 py-0 font-normal rounded-full text-neutral-300 bg-neutral-600 hover:bg-blue-600"
            onClick={() => {
              setEditMode(true)
            }}
          >
            edit
          </button>
        </div>
        {user.persona && (
          <h1 className="text-3xl font-medium text-neutral-300">{`${user.persona[0]} ${user.persona[1]}`}</h1>
        )}
      </div>
    )
  )
}
