import type { PipelineStage, Types } from 'mongoose';
import { adminModel } from './admin.schema.js';

type MongoFilter = Record<string, unknown>;

const create = (data: Record<string, unknown>) => adminModel.create(data);
const find = (filter: MongoFilter = {}) => adminModel.find(filter);
const findLean = (filter: MongoFilter = {}) => adminModel.find(filter).lean();
const findOne = (filter: MongoFilter = {}) => adminModel.findOne(filter);
const findOneLean = (filter: MongoFilter = {}) => adminModel.findOne(filter).lean();
const update = (id: string | Types.ObjectId, data: Record<string, unknown>) =>
  adminModel.updateOne({ _id: id }, data);
const remove = (id: string | Types.ObjectId) =>
  adminModel.updateOne({ _id: id }, { isDeleted: true });
const aggregate = <TResult = unknown>(pipeline: PipelineStage[]) =>
  adminModel.aggregate<TResult>(pipeline);
export default {
  create,
  find,
  findLean,
  findOne,
  findOneLean,
  update,
  remove,
  aggregate,
};
