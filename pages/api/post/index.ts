// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mongodb from '../../../libs/db'

type Post = {
  id?: string
  title?: string
  profile_link?: string
  img_source?: string
  abstract?: string
  diamond_count?: number
  nickname?: string
  comment_count?: number
  like_count?: number
}

type Res = {
  success: boolean
  data?: Post[]
  total?: number
  page?: number
}

export const getPosts = async (
  params: Record<string, any>
): Promise<{ posts: Post[]; total: number }> => {
  const { pageNum } = params
  try {
    const col = await mongodb.col('posts')
    const total = await col.countDocuments()
    const posts = (await col
      .find()
      .skip((pageNum - 1) * 5)
      .limit(20)
      .toArray()) as Post[]

    return { posts, total }
  } catch (e) {
    console.log(e)
    return { posts: [], total: 0 }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  const { method } = req
  switch (method) {
    case 'POST':
      break
    case 'GET':
      const { page } = req.query
      const pageNumber = Number(page)
      try {
        const { posts, total } = await getPosts({ pageNum: pageNumber })
        res
          .status(200)
          .json({ success: true, data: posts, page: pageNumber, total })
      } catch (e) {
        console.log(e)
      }
      break
    default:
      res.status(400).json({ success: false })
      console.error(`${method} method don't support`)
      break
  }
}
