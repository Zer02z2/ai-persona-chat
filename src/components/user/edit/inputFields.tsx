import styles from "./style.module.css"

interface Props {
  inputA: string
  inputB: string
  usableState: boolean
  handleInputChange: { A: (value: string) => void; B: (value: string) => void }
}

export const InputFields = ({ props }: { props: Props }) => {
  const { inputA, inputB, usableState, handleInputChange } = props
  return (
    <div className="flex justify-between pb-10 text-lg font-medium text-neutral-600">
      <input
        type="text"
        placeholder="adj."
        className={styles.input}
        value={inputA}
        onChange={(e) => {
          handleInputChange.A(e.target.value)
        }}
        disabled={!usableState}
      ></input>
      <input
        type="text"
        placeholder="noun."
        className={styles.input}
        value={inputB}
        onChange={(e) => {
          handleInputChange.B(e.target.value)
        }}
        disabled={!usableState}
      ></input>
    </div>
  )
}
