import { useState } from "react"
import styles from "./style.module.css"
import { getImage } from "../../fetch/fetch"

export const CreateUser = () => {
  const [inputValid, setInputValid] = useState<boolean>(false)
  const [savable, setSavable] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string | null>()
  const [inputA, setInputA] = useState<string>("")
  const [inputB, setInputB] = useState<string>("")

  const fetchProfileImage = async () => {
    if (!inputValid) return
    const input = inputA + " " + inputB
    const url = await getImage(input)
    if (!url) {
      alert("Please try again.")
      return
    }
    setImageUrl(url)
  }

  const checkInput = () => {
    const filteredStringA = inputA.replace(/[^a-zA-Z]/g, "")
    const filteredStringB = inputB.replace(/[^a-zA-Z]/g, "")
    if (filteredStringA.length > 0 && filteredStringB.length > 0) {
      setInputValid(true)
    } else {
      setInputValid(false)
    }
  }

  return (
    <div className="fixed top-0 left-0 grid w-screen h-screen place-items-center backdrop-blur-md">
      <div className="p-6 rounded-sm bg-neutral-100 w-[30rem]">
        <h1 className="pb-4 text-xl font-medium text-neutral-800">
          Create your persona:
        </h1>
        <div className="w-full aspect-[1/1] rounded-sm overflow-hidden mb-4">
          <img
            src={imageUrl ? imageUrl : "questionMark.jpg"}
            className="object-cover min-h-full"
          ></img>
        </div>
        <div className="flex justify-between pb-6 text-lg font-medium text-neutral-600">
          <input
            type="text"
            placeholder="adj."
            className={styles.input}
            value={inputA}
            onChange={(e) => {
              setInputA(e.target.value)
              checkInput()
            }}
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
          ></input>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className={`${
              inputValid
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
                ? "bg-green-600 cursor-pointer"
                : "bg-neutral-300 cursor-default"
            } ${styles.button}`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
