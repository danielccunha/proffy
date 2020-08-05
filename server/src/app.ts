import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.middleware();
    this.database();
    this.routes();
  }

  middleware() {
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(express.json());
  }

  database() {
    //
  }

  routes() {
    this.express.use(routes);
  }
}

export default new App().express;
