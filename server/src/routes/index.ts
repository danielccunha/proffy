import { Router } from 'express';
import * as controllers from '../controllers';

const routes = Router();

// Classes
routes.post('/classes', controllers.Class.create);

export default routes;
