const cacheableResponse = require('cacheable-response')
const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 4000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()



const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60,
  get: async ({ req, res, pagePath, queryParams }) => ({
    data: await app.renderToHTML(req, res, pagePath, queryParams)
  }),
  send: ({ data, res }) => res.send(data)
})



const cacheablePages = [
  {
    path: '/',
    pagePath: '/',
    toQuery: (req) => ({})
  },
  {
    path: '/movie/:name/:id',
    pagePath: '/movie',
    toQuery: (req) => ({ id: req.params.id, name: req.params.name }),
  },
  {
    path: '/page/:path/:id',
    pagePath: '/page',
    toQuery: (req) => ({ path: req.params.path, id: req.params.id }),
  }

];



app.prepare().then(() => {

  const server = express()

  for (i = 0; i < cacheablePages.length; ++i) {

    const toQuery = cacheablePages[i].toQuery
    const pagePath = cacheablePages[i].pagePath;

    server.get(cacheablePages[i].path, (req, res) => {

      const queryParams = toQuery(req);

      if (dev || req.query.noCache) { //dev || req.query.noCache
        return app.render(req, res, pagePath, queryParams);
      } else {
        ssrCache({ req, res, pagePath: pagePath, queryParams: queryParams });
      }
    })
  }
  
  /*
  server.get('/', (req, res) => {
    if (dev || req.query.noCache) {
      return handle(req, res)
    } else {
      ssrCache({ req, res, pagePath: '/' })
    }
  })

  server.get('/contact', (req, res) => {
    if (dev || req.query.noCache) {
      return handle(req, res)
    } else {
      ssrCache({req, res, pagePath: req.path, queryParams: req.query});
    }
  })

  server.get('/overons', (req, res) => {
    if (dev || req.query.noCache) {
      return handle(req, res)
    } else {
      ssrCache({req, res, pagePath: req.path, queryParams: req.query});
    }
  })

  server.get('/portfolio', (req, res) => {
    if (dev || req.query.noCache) {
      return handle(req, res)
    } else {
      ssrCache({req, res, pagePath: req.path, queryParams: req.query});
    }
  })
  */
 
  server.get('/printTicket/:ticketId/:token', (req, res) => {
    return app.render(req, res, "/printTicket", { ticketId: req.params.ticketId, token: req.params.token });
  });


  server.get('*', (req, res) => {
        return handle(req, res)
  });




  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})