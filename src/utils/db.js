import * as R from 'ramda';

const convertToObject = R.pipe(
  (model) => model.toObject(),
  ({ _id, _v, ...rest }) => ({ id: _id, ...rest }),
  R.dissoc('__v'),
);

export { convertToObject };
