import { fromPairs } from 'ramda';

import { Model } from '../models';
import { convertToObject } from '../utils/db';

const getModelMetadata = (sessionProvider) => (model) =>
  // TODO: Get metadata from Onnx.js runtime
  ({
    inputName: null,
    outputName: null,
    inputSize: null,
    outputSize: null,
  });

const saveModel = (storageProvider, sessionProvider) => async (modelFile) => {
  const metadata = getModelMetadata(sessionProvider)(modelFile);
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
  return storageProvider.downloadFile(model._id);
};

const deleteModel = (storageProvider) => async (id) => {
  await Model.findByIdAndDelete(id).exec();
  return storageProvider.deleteFile(id);
};

const getAllModels = async () => {
  const models = await Model.find({}).exec();
  const pairs = models.map((model) => {
    const obj = convertToObject(model);
    return [obj.id, obj];
  });
  return fromPairs(pairs);
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
