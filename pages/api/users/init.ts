// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mongodb from '../../../libs/db'
import { users } from '../../../libs/simple-data'

type Data = {
  success: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const col = mongodb.col(process.env.MONGODB_USER_COLLECTION_NAME!)
  try {
    await col.deleteMany({})
    await col.insertMany(users)
    console.log('User data insert success')
    res.status(200).json({ success: true })
  } catch (e) {
    console.log('User data insert failed' + '\n')
    console.log(e)
    res.status(200).json({ success: false })
  }
}
