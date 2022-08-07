import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import SimpleLineIconsRefresh from '~icons/simple-line-icons/refresh'
import fetcher from '../libs/fetch'
import Avatar from './avatar'
import PostFollowing from './post-following'
import styles from './recommended-author.module.css'

interface User {
  id: number
  slug: string
  nickname: string
  avatar_source: string
  total_likes_count: number
  total_wordage: number
  is_following_user: boolean
}

type Users = User[]

const RecommendedAuthors = () => {
  // const { data, mutate } = useSWR<UsersRes>('/api/users', fetcher)
  const [users, setUsers] = useState<Users>([])
  const usersRef = useRef<Users>([])

  // 10000 => 10k
  const formatByThousand = (val: number): string => {
    const thousandTimes = val / 1000 + ''
    const dotIndex = thousandTimes.indexOf('.')
    const str = thousandTimes.substring(0, dotIndex + 2)
    return `${str}k`
  }

  // refresh authors list
  const onRefresh = async () => {
    const user_ids = usersRef.current.map((item) => item.id).join()
    const query: Record<string, any> = {
      user_ids,
      count: 5,
    }
    const queryParams = Object.keys(query)
      .reduce<string[]>((prev, key) => {
        const val = query[key]
        prev.push(`${key}=${val}`)
        return prev
      }, [])
      .join('&')
    const res: Record<string, any> = await fetcher(`/api/users?${queryParams}`)
    const data = res.data || []
    setUsers(data)
    usersRef.current = [...usersRef.current, ...data]
  }

  const toggleLike = async (id: number) => {
    const res = await fetcher(`/api/users/${id}/toggle_like`, {
      method: 'PUT',
    })
    if (res.success) {
      setUsers((prevState) =>
        prevState.map((item) => {
          if (item.id === id) {
            item.is_following_user = !item.is_following_user
          }
          return item
        })
      )
    }
  }

  useEffect(() => {
    // Next.js use strictMode
    // strictMode renders components twice (on dev but not production) in order to detect any problems with your code
    // and warn you about them (which can be quite useful).
    // so onRefresh will call width twice
    onRefresh()
  }, [])

  return (
    <div className={styles.wrap}>
      <div className={styles.authors}>
        <div className={styles.title}>
          <span>推荐作者</span>
          <a className={styles['page-change']} onClick={onRefresh}>
            <SimpleLineIconsRefresh />
            <span>换一批</span>
          </a>
        </div>
        <ul className={styles.list}>
          {users ? (
            users.map((user) => {
              const {
                id,
                nickname,
                avatar_source,
                total_likes_count,
                total_wordage,
                is_following_user,
              } = user

              const followCls = classNames({
                [styles.follow]: !is_following_user,
                [styles.following]: is_following_user,
              })

              return (
                <li key={id} className={styles.item}>
                  <div className={styles.left}>
                    <Avatar
                      src={avatar_source}
                      alt="avatar"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className={styles.info}>
                    <a className={styles.name}>{nickname}</a>
                    <p>
                      {`写了${formatByThousand(
                        total_wordage
                      )}字 · ${formatByThousand(total_likes_count)}喜欢`}
                    </p>
                  </div>
                  <div className={styles.right}>
                    <PostFollowing
                      className={followCls}
                      following={is_following_user}
                      onClick={() => toggleLike(id)}
                    />
                  </div>
                </li>
              )
            })
          ) : (
            <div>No user data</div>
          )}
        </ul>
      </div>
    </div>
  )
}

export default RecommendedAuthors
