import express from 'express';
import inferenceRouter from './inference';
import modelRouter from './model';
import sessionRouter from './session';

const router = express.Router();

router.use(modelRouter);
router.use(inferenceRouter);
router.use(sessionRouter);

export default router;
