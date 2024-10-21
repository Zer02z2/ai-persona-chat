import { Loader } from "../../loader/loader"
import { Usables } from "./editUser"
import styles from "./style.module.css"

interface Props {
  handleGenerate: () => Promise<void>
  handleSave: () => Promise<void>
  usables: Usables
}

export const Buttons = ({ props }: { props: Props }) => {
  const { handleGenerate, handleSave, usables } = props
  return (
    <div className="relative flex items-center justify-end gap-2">
      {usables.loader ? <Loader /> : <></>}
      <button
        className={`${
          usables.generateButton
            ? "bg-amber-300 cursor-pointer"
            : "bg-neutral-300 cursor-default pointer-events-none"
        } ${styles.button}`}
        onClick={handleGenerate}
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
  )
}
