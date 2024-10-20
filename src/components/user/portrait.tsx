//import { useEffect, useState } from "react"
import { User } from "../../firebase/config"

export const Portrait = ({ user }: { user: User | null }) => {
  //const [imgSrc, setImgSrc] = useState<string>("/questionMark.jpg")

  return (
    <div className="w-full aspect-[5/7] bg-neutral-500 rounded-sm overflow-hidden">
      <img
        src={
          user && user.profileImage ? user.profileImage : "/questionMark.jpg"
        }
        className="object-cover min-h-full"
      ></img>
    </div>
  )
}
