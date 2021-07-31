// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

router.render = (req, res) => {
  res.jsonp({
    results: res.locals.data
  })
}

server.use(middlewares)
server.use(router)
server.listen(5000, () => {
  console.log('JSON Server is running')
})
