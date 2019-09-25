import express from 'express';

const router = express.Router();

router.get('/predict/:sessionId', (req, res) => {
});

router.get('/evaluate/:sessionId', (req, res) => {
  const { query, params } = req;
  const { metric } = query;

  res.json(metric);
});

router.get('/metrics', (req, res) => {
});

export default router;
