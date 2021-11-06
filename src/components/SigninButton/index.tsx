import { signIn, signOut, useSession } from 'next-auth/client'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

// styles
import styles from './styles.module.scss'

function SigninButton() {
  const [session] = useSession()

  return session ? (
    <button
      type='button'
      className={styles.signinButton}
      onClick={() => signOut()}
    >
      <FaGithub color='#04b361' />
      {session.user.name}
      <FiX color='#737380' className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type='button'
      className={styles.signinButton}
      onClick={() => signIn('github')}
    >
      <FaGithub color='#eba417' />
      Sign In with Github
    </button>
  )
}

export { SigninButton }
