
const getModelMetadata = (model) => {
  // TODO: Get metadata from Onnx.js runtime
  console.log(model);
  return {
    inputName: null,
    outputName: null,
    inputSize: null,
    outputSize: null,
  };
};

export { getModelMetadata };
