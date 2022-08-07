import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Post: NextPage = () => {
  const router = useRouter()
  const { pid } = router.query
  return <div className="post">Post: {pid}</div>
}

export default Post
