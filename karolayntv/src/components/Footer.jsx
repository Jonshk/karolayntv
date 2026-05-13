import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <img src="/logo-kv.png" alt="Karolayntv" className={styles.logoImg} />

      <div className={styles.center}>
        <p className={styles.copy}>
          © {year} Karolaynt Villarroel. Todos los derechos reservados.
        </p>
      </div>

      <nav className={styles.links}>
        <a href="#about">Sobre mí</a>
        <a href="#services">Servicios</a>
        <a href="#redes">Redes</a>
        <a href="#contact">Contacto</a>
      </nav>
    </footer>
  )
}