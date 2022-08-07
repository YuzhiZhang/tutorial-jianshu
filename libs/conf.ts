const connString = process.env.MONGODB_CONN_STRING || ''
const dbName = process.env.MONGODB_DB_NAME || ''

if (!process.env.MONGODB_CONN_STRING) {
  throw new Error('Miss connString, please add your MONGODB_CONN_STRING to .env.local')
}

export default {
  url: connString,
  dbName,
}
