import http from "node:http";
import { json } from "./middlewares/json.js";

import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

// Query Parameters: URL Stateful => Filtres, pagination, não obrigatorias
// https://github.com/users/?userId=1&age=15

// Route Parameters: Identifier recurso
// GET https://github.com/users/1/

// Request Body
// {"username": "talismar"}

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });


  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);
