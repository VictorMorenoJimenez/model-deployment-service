import {
  Aborter,
  BlockBlobURL,
  ContainerURL,
  ServiceURL,
  SharedKeyCredential,
  StorageURL,
  uploadStreamToBlockBlob,
  uploadFileToBlockBlob,
} from '@azure/storage-blob';

import fs from 'fs';
import path from 'path';
import config from '../config';

const ONE_MEGABYTE = 1024 * 1024;
const FOUR_MEGABYTES = 4 * ONE_MEGABYTE;
const ONE_MINUTE = 60 * 1000;

const DEFAULT_ABORTER = Aborter.timeout(30 * ONE_MINUTE);
const { STORAGE_ACCOUNT_NAME, ACCOUNT_ACCESS_KEY, CONTAINER_NAME } = config;

const credentials = new SharedKeyCredential(STORAGE_ACCOUNT_NAME, ACCOUNT_ACCESS_KEY);
const pipeline = StorageURL.newPipeline(credentials);
const serviceURL = new ServiceURL(
  `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  pipeline,
);

const containerURL = ContainerURL.fromServiceURL(serviceURL, CONTAINER_NAME);

const uploadContent = async (content, blobName) => {
  const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);
  return blockBlobURL.upload(DEFAULT_ABORTER, content, content.length);
};

const uploadFile = async (filepath) => {
  const resolvedFilepath = path.resolve(filepath);
  const fileName = path.basename(resolvedFilepath);
  const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, fileName);
  return uploadFileToBlockBlob(DEFAULT_ABORTER, resolvedFilepath, blockBlobURL);
};

const uploadStream = async (filepath) => {
  const resolvedFilepath = path.resolve(filepath);
  const fileName = path.basename(resolvedFilepath).replace('.md', '-stream.md');
  const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, fileName);

  const stream = fs.createReadStream(resolvedFilepath, {
    highWaterMark: FOUR_MEGABYTES,
  });

  const uploadOptions = {
    bufferSize: FOUR_MEGABYTES,
    maxBuffers: 5,
  };

  return uploadStreamToBlockBlob(
    DEFAULT_ABORTER,
    stream,
    blockBlobURL,
    uploadOptions.bufferSize,
    uploadOptions.maxBuffers,
  );
};

const deleteFile = async (blobName) => {
  const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);
  return blockBlobURL.delete(DEFAULT_ABORTER);
};

const downloadFile = async (blobName) => {
  const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);
  return blockBlobURL.download(DEFAULT_ABORTER, 0);
  // const downloadedContent = downloadResponse.readableStreamBody.read(content.length).toString();
};

export {
  uploadContent, uploadFile, uploadStream, deleteFile, downloadFile,
};
