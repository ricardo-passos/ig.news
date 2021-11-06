// components
import { SigninButton } from '../SigninButton'
import { ActiveLink } from '../ActiveLink'

// styles
import styles from './styles.module.scss'

function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src='/images/logo.svg' alt='ig.news logo' />
        <nav>
          <ActiveLink activeClassName={styles.active} href='/'>
            Home
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href='/posts'>
            Posts
          </ActiveLink>
        </nav>
        <SigninButton />
      </div>
    </header>
  )
}

export { Header }
