import { AUTH_RESPONSES } from './auth.responses.js';
import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { getPrivateKey } from '../../utility/key.generate.js';
import bcrpt from 'bcrypt';
import adminServices from '../admin/admin.services.js';

const jwtOptions: SignOptions = {
  algorithm: 'RS256',
  expiresIn: (process.env.JWT_EXPIRES_IN || '1h') as Exclude<SignOptions['expiresIn'], undefined>,
};


const AdminLogin = async (nameOrEmail: string, password: string) => {
  const admin = await adminServices.findOneLean({
    $or: [{ email: nameOrEmail.toLowerCase() }, { name: nameOrEmail }],
  });
  if (!admin) throw AUTH_RESPONSES.INVALID_CREDENTIALS;
  const isPasswordValid = await bcrpt.compare(password, admin.password as string);
  if (!isPasswordValid) throw AUTH_RESPONSES.INVALID_CREDENTIALS;
  const token = jwt.sign({ id: admin._id, role: admin.role }, getPrivateKey(), jwtOptions);
  return { token, ...admin, password: undefined };
};


export default {
  AdminLogin,
};
