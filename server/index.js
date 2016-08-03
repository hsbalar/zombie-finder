import http from "http";

import app from "./config/express";
import routes from "./routes";

export function start() {

  return new Promise((resolve, reject) => {

      let server = http.createServer(app);

      app.server = server;
      routes(app);
      // start server
      app.server.listen(3000, (err) => {
        if (err) {
          return reject(err);
        }
        resolve(app);
      });
    });
};
