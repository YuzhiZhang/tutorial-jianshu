import styles from './navbar.module.css'
import Image from 'next/image';
import Link from 'next/link';

const LOGO_URL =
  'https://cdn2.jianshu.io/assets/web/nav-logo-4c7bbafe27adc892f3046e6978459bac.png'

const Navbar = () => {

  return <nav className={styles.navbar}>
    <div className={styles.logo}>
      <Link href="/">
        <a>
          <Image src={LOGO_URL} alt="Nav logo" width={100} height={56} />
        </a>
      </Link>
    </div>
  </nav>
}

export default Navbar
