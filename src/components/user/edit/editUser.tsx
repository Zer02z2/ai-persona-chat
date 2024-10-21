import { useEffect, useState } from "react"
import { getImage } from "../../../fetch/fetch"
import { User } from "../../../firebase/config"
import { InputFields } from "./inputFields"
import { saveChanges } from "./saveChanges"
import { Buttons } from "./buttons"
import styles from "./style.module.css"

export interface Usables {
  input: boolean
  generateButton: boolean
  saveButton: boolean
  loader: boolean
}

export const EditUser = ({
  user,
  isInit,
  handleClose,
}: {
  user: User
  isInit: boolean
  handleClose: () => void
}) => {
  const [inputA, setInputA] = useState<string>(
    (user.persona && user.persona[0]) || ""
  )
  const [inputB, setInputB] = useState<string>(
    (user.persona && user.persona[1]) || ""
  )
  const [usables, setUsables] = useState<Usables>({
    input: true,
    generateButton: false,
    saveButton: false,
    loader: false,
  })
  const [imageUrl, setImageUrl] = useState<string | null | undefined>(
    user.profileImage
  )

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

  useEffect(() => {
    const filteredStringA = inputA.replace(/[^a-zA-Z]/g, "")
    const filteredStringB = inputB.replace(/[^a-zA-Z]/g, "")
    const inputValid = filteredStringA.length > 0 && filteredStringB.length > 0
    setUsables({ ...usables, generateButton: inputValid, saveButton: false })
  }, [inputA, inputB])

  const updateInput = {
    A: (value: string) => {
      setInputA(value)
    },
    B: (value: string) => {
      setInputB(value)
    },
  }

  return (
    <div className="fixed top-0 left-0 grid w-screen h-screen place-items-center backdrop-blur-md">
      <div className="p-6 rounded-md bg-neutral-700 w-[30rem]">
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-xl font-medium text-neutral-300">
            {`${isInit ? "Create" : "Edit"} your persona:`}
          </h1>
          {!isInit && (
            <button
              className={
                "px-2 py-0 font-normal rounded-full text-neutral-300 bg-neutral-500 hover:bg-blue-600"
              }
              onClick={handleClose}
            >
              close
            </button>
          )}
        </div>
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
        <Buttons
          props={{
            handleSave: handleSave,
            handleGenerate: fetchProfileImage,
            usables: usables,
          }}
        />
      </div>
    </div>
  )
}
