//import { useEffect, useState } from "react"
import { User } from "../../firebase/config"

export const Portrait = ({ user }: { user: User | null }) => {
  //const [imgSrc, setImgSrc] = useState<string>("/questionMark.jpg")
  console.log(user)

  return (
    <div className="w-full aspect-[5/7] bg-neutral-500 rounded-sm">
      <img src="/questionMark.jpg" className="object-cover min-h-full"></img>
    </div>
  )
}
