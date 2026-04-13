import type { PipelineStage, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import adminRepo from './admin.repo.js';
import type { AggregateResult, AdminInfo, CreateAdminData } from './admin.interface.js';
import { ADMIN_RESPONSES } from './admin.responces.js';

type MongoFilter = Record<string, unknown>;

const create = async (adminData: CreateAdminData) => {
  const admin = await adminRepo.create({
    name: adminData.name,
    email: adminData.email.toLowerCase(),
    isActive: adminData.isActive,
    password: await bcrypt.hash(adminData.password, 10),
  });
  return admin;
};

const find = async (filter: MongoFilter = {}) => {
  const admin = await adminRepo.find(filter);
  return admin as unknown as AdminInfo[];
};

const findLean = async (filter: MongoFilter = {}) => {
  const admin = await adminRepo.findLean(filter);
  return admin as unknown as AdminInfo[];
};

const findOne = async (filter: MongoFilter = {}) => {
  const admin = await adminRepo.findOne(filter);
  return admin as unknown as AdminInfo | null;
};

const findOneLean = async (filter: MongoFilter = {}) => {
  const admin = await adminRepo.findOneLean(filter);
  return admin as unknown as AdminInfo | null;
};

const update = async (id: string | Types.ObjectId, updateData: Record<string, unknown>) => {
  const admin = await adminRepo.update(id, updateData);
  return admin;
};

const remove = async (id: string | Types.ObjectId) => {
  const admin = await adminRepo.remove(id);
  return admin;
};

const setAdminPassword = async (email: string, password: string) => {
  const admin = await findOneLean({ email: email.toLowerCase() });
  if (!admin) throw ADMIN_RESPONSES.ADMIN_NOT_FOUND;
  if (admin.password) throw ADMIN_RESPONSES.PASSWORD_ALREADY_SET;

  const hashedPassword = await bcrypt.hash(password, 10);
  const updatedAdmin = await update(String(admin._id), { password: hashedPassword });
  return updatedAdmin;
};

const aggregate = (pipeline: PipelineStage[]): Promise<AggregateResult[]> =>
  adminRepo.aggregate<AggregateResult>(pipeline).exec();

export default {
  create,
  find,
  findLean,
  findOne,
  findOneLean,
  update,
  remove,
  setAdminPassword,
  aggregate,
};
