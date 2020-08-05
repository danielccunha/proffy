import { Router } from 'express';
import * as controllers from '../controllers';

const routes = Router();

// Classes
routes.get('/classes', controllers.Class.index);
routes.post('/classes', controllers.Class.create);

export default routes;
