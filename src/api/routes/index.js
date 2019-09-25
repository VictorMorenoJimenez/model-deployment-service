import express from 'express';
import inferenceRouter from './inference';
import modelRouter from './model';
import sessionRouter from './session';

const router = express.Router();

router.get('/', (_, res) => {
  res.sendStatus(200);
});

router.use('/model', modelRouter);
router.use('/', inferenceRouter);
router.use('/session', sessionRouter);

export default router;
