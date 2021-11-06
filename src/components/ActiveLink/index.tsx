import Link from 'next/link'
import { useRouter } from 'next/router'

// types
import type { LinkProps } from 'next/link'

type Props = {
  children: string
  activeClassName: string
} & LinkProps

function ActiveLink({ children, activeClassName, ...rest }: Props) {
  const { asPath } = useRouter()

  const className = asPath === rest.href ? activeClassName : ''

  return (
    <Link {...rest}>
      <a className={className}>{children}</a>
    </Link>
  )
}

export { ActiveLink }
