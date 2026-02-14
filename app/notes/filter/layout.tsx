import styles from "./LayoutNotes.module.css";
type PropsLayout = {
    children : React.ReactNode,
    sidebar : React.ReactNode
}

export default function NotesLayout ({children, sidebar}: PropsLayout){
    return (
         <section className={styles.container}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <div className={styles.notesWrapper}>{children}</div>
    </section>
    )
}