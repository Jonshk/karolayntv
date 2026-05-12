import styles from './Cursor.module.css'

export default function Cursor({ cursorRef, ringRef }) {
  return (
    <>
      <div ref={cursorRef} className={styles.cursor} />
      <div ref={ringRef} className={styles.ring} />
    </>
  )
}
