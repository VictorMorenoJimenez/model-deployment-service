import fsLegacy from 'fs';
import path from 'path';

const fs = fsLegacy.promises;

const MODELS_DIR = './models';

const getFilePath = (blobName) => `${MODELS_DIR}/${blobName}`;

const uploadContent = async (content, blobName) =>
  fs.promises.writeFile(getFilePath(blobName), content);

const uploadFile = async (filepath, blobName) => {
  const resolvedFilepath = path.resolve(filepath);
  return fs.rename(resolvedFilepath, getFilePath(blobName));
};

const uploadStream = uploadFile;

const deleteFile = async (blobName) => fs.unlink(getFilePath(blobName));

const downloadFile = async (blobName) => fs.readFile(getFilePath(blobName));

export {
  uploadContent, uploadFile, uploadStream, deleteFile, downloadFile,
};
