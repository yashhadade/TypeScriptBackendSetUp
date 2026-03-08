import { BaseSchema } from '../../utility/base.schema.js';
import { model } from 'mongoose';
import { Role } from '../../utility/constant.js';

const adminSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    default: Role.ADMIN,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    default: null,
  },
});

export const adminModel = model('admins', adminSchema);
