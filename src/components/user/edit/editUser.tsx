import { useState } from "react"
import styles from "./style.module.css"
import { getImage, getImageFile } from "../../../fetch/fetch"
import { Loader } from "../../loader/loader"
import { storage, User } from "../../../firebase/config"
import { updateUser } from "../udateUser"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const EditUser = ({ user }: { user: User }) => {
  const [readyToGenerate, setReadyToGenerate] = useState<boolean>(false)
  const [savable, setSavable] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string | null | undefined>(
    user.profileImage
  )
  const [inputA, setInputA] = useState<string>("")
  const [inputB, setInputB] = useState<string>("")
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const fetchProfileImage = async () => {
    if (!readyToGenerate) return
    const input = inputA + " " + inputB
    setIsFetching(true)
    setReadyToGenerate(false)
    setSavable(false)
    const url = await getImage(input)
    setIsFetching(false)
    setReadyToGenerate(true)
    if (!url) {
      alert("Please try again.")
      return
    }
    setImageUrl(url)
    setSavable(true)
  }

  const checkInput = () => {
    const filteredStringA = inputA.replace(/[^a-zA-Z]/g, "")
    const filteredStringB = inputB.replace(/[^a-zA-Z]/g, "")
    if (filteredStringA.length > 0 && filteredStringB.length > 0) {
      setReadyToGenerate(true)
    } else {
      setReadyToGenerate(false)
    }
    setSavable(false)
  }

  const saveChanges = async () => {
    if (!imageUrl) {
      alert("Please generate profile image first.")
      return
    }
    const file = await getImageFile(imageUrl, user.uid)
    if (!file) return
    console.log(file)
    const uploadRef = ref(storage, `ai-persona-chat/${user.uid}/profile-image`)
    const snapshot = await uploadBytes(uploadRef, file)
    const url = await getDownloadURL(snapshot.ref)
    console.log(url)
    const userInfo: User = {
      uid: user.uid,
      name: user.name,
      persona: [inputA, inputB],
    }
    updateUser(userInfo)
  }

  return (
    <div className="fixed top-0 left-0 grid w-screen h-screen place-items-center backdrop-blur-md">
      <div className="p-6 rounded-md bg-neutral-700 w-[30rem]">
        <h1 className="pb-4 text-xl font-medium text-neutral-300">
          Create your persona:
        </h1>
        <div className="w-full aspect-[1/1] rounded-md overflow-hidden mb-4">
          <img
            src={imageUrl ? imageUrl : "questionMark.jpg"}
            className="object-cover min-h-full"
          ></img>
        </div>
        <div className="flex justify-between pb-10 text-lg font-medium text-neutral-600">
          <input
            type="text"
            placeholder="adj."
            className={styles.input}
            value={inputA}
            onChange={(e) => {
              setInputA(e.target.value)
              checkInput()
            }}
            disabled={isFetching}
          ></input>
          <input
            type="text"
            placeholder="noun."
            className={styles.input}
            value={inputB}
            onChange={(e) => {
              setInputB(e.target.value)
              checkInput()
            }}
            disabled={isFetching}
          ></input>
        </div>
        <div className="relative flex items-center justify-end gap-2">
          {isFetching ? <Loader /> : <></>}
          <button
            className={`${
              readyToGenerate
                ? "bg-amber-300 cursor-pointer"
                : "bg-neutral-300 cursor-default"
            } ${styles.button}`}
            onClick={fetchProfileImage}
          >
            Generate profile image
          </button>
          <button
            className={`${
              savable
                ? "bg-green-500 cursor-pointer"
                : "bg-neutral-300 cursor-default"
            } ${styles.button}`}
            onClick={saveChanges}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
