import { useState } from "react"
import styles from "./style.module.css"
import { getImage, getImageFile } from "../../../fetch/fetch"
import { Loader } from "../../loader/loader"
import { storage, User } from "../../../firebase/config"
import { updateUser } from "../udateUser"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

interface Usables {
  input: boolean
  generateButton: boolean
  saveButton: boolean
  loader: boolean
}

export const EditUser = ({ user }: { user: User }) => {
  const [imageUrl, setImageUrl] = useState<string | null | undefined>(
    user.profileImage
  )
  const [inputA, setInputA] = useState<string>("")
  const [inputB, setInputB] = useState<string>("")
  const [usables, setUsables] = useState<Usables>({
    input: true,
    generateButton: false,
    saveButton: false,
    loader: false,
  })

  const lockAllFields = () => {
    setUsables({
      input: false,
      generateButton: false,
      saveButton: false,
      loader: true,
    })
  }
  const unlockAllFields = () => {
    setUsables({
      input: true,
      generateButton: true,
      saveButton: true,
      loader: false,
    })
  }

  const fetchProfileImage = async () => {
    const input = inputA + " " + inputB
    lockAllFields()
    const url = await getImage(input)
    unlockAllFields()
    if (!url) {
      setUsables({ ...usables, saveButton: false })
      alert("Please try again.")
      return
    }
    setImageUrl(url)
  }

  const checkInput = () => {
    const filteredStringA = inputA.replace(/[^a-zA-Z]/g, "")
    const filteredStringB = inputB.replace(/[^a-zA-Z]/g, "")
    const inputValid = filteredStringA.length > 0 && filteredStringB.length > 0
    setUsables({ ...usables, generateButton: inputValid, saveButton: false })
  }

  const saveChanges = async () => {
    if (!imageUrl) {
      alert("Please generate profile image first.")
      return
    }
    lockAllFields()
    const file = await getImageFile(imageUrl, user.uid)
    if (!file) {
      unlockAllFields()
      alert("Please try again.")
      return
    }
    console.log(file)
    const uploadRef = ref(storage, `ai-persona-chat/${user.uid}/profile-image`)
    try {
      const snapshot = await uploadBytes(uploadRef, file)
      const url = await getDownloadURL(snapshot.ref)
      console.log(url)
      const userInfo: User = {
        uid: user.uid,
        name: user.name,
        persona: [inputA, inputB],
        profileImage: url,
      }
      updateUser(userInfo)
    } catch (error) {
      console.log(error)
      alert("Please try again")
    }
    unlockAllFields()
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
            disabled={!usables.input}
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
            disabled={!usables.input}
          ></input>
        </div>
        <div className="relative flex items-center justify-end gap-2">
          {usables.loader ? <Loader /> : <></>}
          <button
            className={`${
              usables.generateButton
                ? "bg-amber-300 cursor-pointer"
                : "bg-neutral-300 cursor-default pointer-events-none"
            } ${styles.button}`}
            onClick={fetchProfileImage}
          >
            Generate profile image
          </button>
          <button
            className={`${
              usables.saveButton
                ? "bg-green-500 cursor-pointer"
                : "bg-neutral-300 cursor-default pointer-events-none"
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
