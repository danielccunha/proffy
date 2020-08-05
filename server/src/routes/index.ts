import { Router } from 'express';
import * as controllers from '../controllers';

const routes = Router();

routes.get('/classes', controllers.Classes.index);
routes.post('/classes', controllers.Classes.create);
routes.get('/connections', controllers.Connections.index);
routes.post('/connections', controllers.Connections.create);

export default routes;
