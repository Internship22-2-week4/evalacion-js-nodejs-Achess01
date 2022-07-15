import Server from './Server.js'

export default function start(config) {
  const server = new Server(config)
  server.start()
}
