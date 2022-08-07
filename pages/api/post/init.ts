// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mongodb from '../../../libs/db'
import { posts } from '../../../libs/simple-data';

type Data = {
  success: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const col = mongodb.col(process.env.MONGODB_POST_COLLECTION_NAME!)
  try {
    await col.deleteMany({})
    await col.insertMany(posts)
    console.log('Posts data insert success')
    res.status(200).json({ success: true })
  } catch (e) {
    console.log('Posts data insert failed' + '\n')
    console.log(e)
    res.status(200).json({ success: false })
  }
}
