import Routers from '../feature-modules/routes.index.js';
import { ExcludedPath } from '../middleware/token.validate.js';

const routes = [
  Routers.adminRoutes,
];


export default { routes };

export const excludedPaths = [
  new ExcludedPath('/admin/create', 'POST'),
];
