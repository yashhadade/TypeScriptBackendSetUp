import express from 'express';
import routes, { excludedPaths, excludedPathsforApiKey } from './routes.data.js';
import { errorHandler } from '../middleware/errorHandler.js';
import { tokenValidator } from '../middleware/token.validate.js';
import { apiKeyValidator } from '../middleware/apiKey.validate.js';
import { apiCountHandler } from '../middleware/apiCountHandler.js';
import { registerAppMiddleware } from '../middleware/app.middleware.js';

export const registerRoutes = (app: express.Application) => {
  registerAppMiddleware(app);

  for (const route of routes.routes) {
    app.use(route.path, tokenValidator(excludedPaths), route.router);
  }

  for (const route of routes.routesWithApiKey) {
    app.use(
      route.path,
      apiKeyValidator(excludedPathsforApiKey),
      apiCountHandler(excludedPathsforApiKey),
      route.router
    );
  }

  app.use(errorHandler);
};
