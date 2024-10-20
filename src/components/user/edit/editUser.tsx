import { useState } from "react"
import styles from "./style.module.css"
import { getImage } from "../../../fetch/fetch"
import { Loader } from "../../loader/loader"
import { User } from "../../../firebase/config"
import { InputFields } from "./inputFields"
import { saveChanges } from "./saveChanges"

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

  const handleSave = async () => {
    if (!imageUrl) {
      alert("Please generate profile image first.")
      return
    }
    lockAllFields()
    await saveChanges({
      props: {
        imageUrl: imageUrl,
        inputs: [inputA, inputB],
        user: user,
      },
    })
    unlockAllFields()
  }

  const checkInput = () => {
    const filteredStringA = inputA.replace(/[^a-zA-Z]/g, "")
    const filteredStringB = inputB.replace(/[^a-zA-Z]/g, "")
    const inputValid = filteredStringA.length > 0 && filteredStringB.length > 0
    setUsables({ ...usables, generateButton: inputValid, saveButton: false })
  }

  const updateInput = {
    A: (value: string) => {
      setInputA(value)
      checkInput()
    },
    B: (value: string) => {
      setInputB(value)
      checkInput()
    },
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
        <InputFields
          props={{
            inputA: inputA,
            inputB: inputB,
            handleInputChange: updateInput,
            usableState: usables.input,
          }}
        />
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
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
