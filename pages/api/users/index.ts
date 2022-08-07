// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mongodb from '../../../libs/db'
import { users } from '../../../libs/simple-data'

type User = {
  id?: number
  slug?: string
  nickname?: string
  avatar_source?: string
  total_likes_count?: number
  total_wordage?: number
  is_following_user?: boolean
}

type Res = {
  success: boolean
  data?: User[]
  total?: number
  page?: number
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
      const { user_ids, count } = req.query
      let whereStr = {}
      if (user_ids) {
        whereStr = {
          id: {
            $ne: (user_ids as string).split(','),
          },
        }
      }

      try {
        const col = await mongodb.col('users')
        const total = await col.countDocuments()
        const users = (await col.find().toArray()) as User[]
        const filterUsers = users
          .filter((item) => {
            if (user_ids) {
              return !user_ids.includes(item.id + '')
            }

            return true
          })
          .slice(0, Number(count) || 5)
        console.log('Users: \n', JSON.stringify(users))
        res.status(200).json({ success: true, data: filterUsers, total })
      } catch (e) {
        res.status(200).json({ success: false })
        console.log(e)
      }

      break
    default:
      res.status(400).json({ success: false })
      console.error(`${method} method don't support`)
      break
  }
}
