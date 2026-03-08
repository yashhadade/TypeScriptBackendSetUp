import type { PipelineStage, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import adminRepo from './admin.repo.js';
import type { AggregateResult, Admin } from './admin.interface.js';
import { ADMIN_RESPONSES } from './admin.responces.js';

type MongoFilter = Record<string, unknown>;

const create = async (adminData: Record<string, unknown>) => {
  const admin = await adminRepo.create(adminData);
  return admin;
};

const find = async (filter: MongoFilter = {}) => {
  const admin = await adminRepo.find(filter);
  return admin as unknown as Admin[];
};

const findLean = async (filter: MongoFilter = {}) => {
  const admin = await adminRepo.findLean(filter);
  return admin as unknown as Admin[];
};

const findOne = async (filter: MongoFilter = {}) => {
  const admin = await adminRepo.findOne(filter);
  return admin as unknown as Admin | null;
};

const findOneLean = async (filter: MongoFilter = {}) => {
  const admin = await adminRepo.findOneLean(filter);
  return admin as unknown as Admin | null;
};

const update = async (id: string | Types.ObjectId, updateData: Record<string, unknown>) => {
  const admin = await adminRepo.update(id, updateData);
  return admin;
};

const remove = async (id: string | Types.ObjectId) => {
  const admin = await adminRepo.remove(id);
  return admin;
};

const seedDummy = async () => {
  const existing = await findLean();
  if (existing.length > 0) return existing;

  const dummyAdmins: Record<string, unknown>[] = [
    { name: 'Primary Admin', email: 'admin@whitebox.dev', role: 'SUPER_ADMIN', isActive: true },
    { name: 'Ops Admin', email: 'ops@whitebox.dev', role: 'OPS_ADMIN', isActive: true },
  ];

  await Promise.all(dummyAdmins.map((a) => create(a)));
  return findLean();
};

const setAdminPassword = async (email: string, password: string) => {
  const admin = await findOneLean({ email: email.toLowerCase() });
  if (!admin) throw ADMIN_RESPONSES.ADMIN_NOT_FOUND;
  if (admin.password) throw ADMIN_RESPONSES.PASSWORD_ALREADY_SET;

  const hashedPassword = await bcrypt.hash(password, 10);
  await update(String(admin._id), { password: hashedPassword } as Record<string, unknown>);
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
  seedDummy,
  setAdminPassword,
  aggregate,
};
