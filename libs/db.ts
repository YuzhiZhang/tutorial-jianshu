import { EventEmitter } from 'events'
import { MongoClient } from 'mongodb'
import conf from './conf'

interface DBConf {
  url: string
  dbName: string
}

class Mongodb {
  conf: DBConf
  emitter: EventEmitter
  client: MongoClient
  constructor(conf: DBConf) {
    this.conf = conf
    this.emitter = new EventEmitter()
    this.client = new MongoClient(conf.url, {})
    this.client.connect((err) => {
      if (err) throw err
      console.log('connect success')
      this.emitter.emit('connect')
    })
  }
  col(colName: string, dbName = conf.dbName) {
    return this.client.db(dbName).collection(colName)
  }
  once(event: string | symbol, cb: (...args: any[]) => void) {
    this.emitter.once(event, cb)
  }
}

export default new Mongodb(conf)
