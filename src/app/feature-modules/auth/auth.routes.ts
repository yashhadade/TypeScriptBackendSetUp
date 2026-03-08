import { Router } from 'express';
import { ResponseHandler } from '../../utility/response.handler.js';
import authServices from './auth.services.js';
import { Route } from '../../routes/routes.types.js';
import { validateBody } from '../../middleware/validateRequest.js';
import type { AdminLoginData } from './auth.interface.js';
import { adminLoginSchema } from './auth.validate.js';
const router = Router();



router.post('/admin/login', validateBody(adminLoginSchema), async (req, res, next) => {
  try {
    const { nameOrEmail, password } = req.body as AdminLoginData;
    const result = await authServices.AdminLogin(nameOrEmail as string, password as string);
    res.send(new ResponseHandler(result));
  } catch (error: unknown) {
    next(error);
  }
});


export default new Route('/auth', router);
