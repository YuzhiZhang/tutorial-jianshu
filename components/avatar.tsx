import Image, { ImageProps } from 'next/image'
import styles from './avatar.module.css'

const Avatar = (props: ImageProps) => {
  return <Image className={styles.avatar} alt="avatar" width={48} height={48} {...props} />
}

export default Avatar
