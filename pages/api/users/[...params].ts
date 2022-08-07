// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { UserSchema } from '../../../interface/users'
import mongodb from '../../../libs/db'

type Res = {
  success: boolean
  data?: UserSchema[]
  total?: number
  page?: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  const { method } = req
  const { params, page } = req.query

  switch (method) {
    // pages/api/users/[id]/toggle_like
    case 'PUT':
      const [id, action] = params as string[]
      if (id && action) {
        const col = await mongodb.col('users')
        const whereStr = { id: Number(id) }
        const user = await col.findOne(whereStr)
        if (user) {
          const updateStr = {
            $set: { is_following_user: !user.is_following_user },
          }
          try {
            await col.updateOne(whereStr, updateStr)
            console.log('update is_following_user success')
            res.status(200).json({ success: true })
          } catch (e) {
            console.log(e)
            res.status(200).json({ success: false })
          }
        } else {
          res.status(200).json({ success: false })
          console.log('Can not find the user' + id)
        }
      } else {
        console.log('Param id or action is empty')
      }

      break
    case 'GET':
      const pageNum = Number(page)
      try {
        const col = await mongodb.col('users')
        const total = await col.countDocuments()
        const users = (await col
          .find()
          .skip((pageNum - 1) * 5)
          .limit(5)
          .toArray()) as UserSchema[]

        res
          .status(200)
          .json({ success: true, data: users, page: pageNum, total })
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
