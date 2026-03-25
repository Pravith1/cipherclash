import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span className={styles.logoPrefix}>CIPHER</span>
        <span className={styles.logoAccent}>CLASH</span>
      </div>

      <div className={styles.links}>
        <a href="#about">About</a>
        <a href="#register">Register</a>
      </div>

      <a href="#register" className={styles.cta}>
        REGISTER NOW
      </a>
    </nav>
  )
}
