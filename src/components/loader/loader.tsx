import styles from "./style.module.css"

export const Loader = () => {
  return (
    <div className="pr-10">
      <div className={styles.loadingBar}></div>
    </div>
  )
}
