import * as R from 'ramda';

import { Model } from '../models';
import { convertToObject } from '../utils/db';

const getModelMetadata = (session) => (model) => {
  // TODO: Get metadata from Onnx.js runtime
  console.log(model);
  return {
    inputName: null,
    outputName: null,
    inputSize: null,
    outputSize: null,
  };
};

const saveModel = (storageProvider) => async (modelFile) => {
  const metadata = getModelMetadata(modelFile);
  const modelDoc = new Model(metadata);
  const model = await modelDoc.save();
  await storageProvider.uploadFile(modelFile, model._id);
  return model._id;
};

const updateModel = (storageProvider) => async (modelFile, modelId) => {
  const metadata = getModelMetadata(modelFile);
  await Model.findByIdAndUpdate(modelId, metadata).exec();
  await storageProvider.uploadFile(modelFile, modelId);
  return modelId;
};

const retreiveModel = (storageProvider) => async (id) => {
  const model = await Model.findById(id).exec();
  return storageProvider.downloadFile(model.resource);
};

const deleteModel = (storageProvider) => async (id) => {
  const model = await Model.findByIdAndDelete(id).exec();
  return storageProvider.deleteFile(model.resource);
};

const getAllModels = async () => {
  const models = await Model.find({}).exec();
  const pairs = models.map((model) => {
    const obj = convertToObject(model);
    return [obj.id, obj];
  });
  return R.fromPairs(pairs);
};

const getModel = async (modelId) => {
  const model = await Model.findById(modelId).exec();
  return convertToObject(model);
};

export {
  saveModel,
  retreiveModel,
  deleteModel,
  updateModel,
  getAllModels,
  getModel,
  getModelMetadata,
};
