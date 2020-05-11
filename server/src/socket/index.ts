import http from 'http'
import io from 'socket.io'

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export class Socket {
  private _io: io.Server

  constructor(httpServer: http.Server) {
    this._io = io(httpServer)

    this.Init()
  }

  private Init() {
    this._io.on('connection', (socket) => {
      const { id } = socket

      this._io.emit('new', { id })

      socket.on('move', (direction) => {
        switch (direction) {
          case Direction[Direction.UP]:
            this._io.emit('move', { id })
            break
          case Direction[Direction.DOWN]:
            this._io.emit('move', { id })
            break
          case Direction[Direction.LEFT]:
            this._io.emit('move', { id })
            break
          case Direction[Direction.RIGHT]:
            this._io.emit('move', { id })
            break
        }
      })

      socket.on('disconnect', () => {
        socket.broadcast.emit('disconnected', id)
      })
    })
  }
}
