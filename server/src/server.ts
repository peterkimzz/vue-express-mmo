import http from 'http'
import express from 'express'
import { Socket } from './socket'

export class Server {
  private _port: number

  private _instance: express.Application
  public get Instance() {
    return this._instance
  }

  private _http: http.Server

  constructor(port: number = 3001) {
    this._port = port

    this._instance = express()
    this._http = new http.Server(this._instance)

    this.Init()
  }

  private Init(): void {
    new Socket(this._http)

    /** 소켓 서버는 CORS 상관 없는 듯 */
    // this._instance.use((req, res, next) => {
    //   res.setHeader('Access-Control-Allow-Origin', '*')
    // })

    this._http.listen(this._port, () => {
      console.log(`listening on http://127.0.0.1:${this._port}..`)
    })
  }
}
