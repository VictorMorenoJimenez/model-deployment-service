import { memoizeWith, identity } from 'ramda';
import { Tensor, InferenceSession } from 'onnxjs';

// TODO: Add memoization with expiration
const getSession = memoizeWith(identity, (model) => {
  const session = new InferenceSession({ backendHint: 'asm' });
  return session.loadModel(model);
});

const predict = async (modelURL, input) => {
  const session = await getSession(modelURL);
  const inputs = [new Tensor(input, 'float32')];
  const outputMap = await session.run(inputs);
  return outputMap.values().next().value.data;
};

const evaluate = (model, metric, input) => {};

export { predict, evaluate };
