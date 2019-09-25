import express from 'express';
import uploadMiddleware from '../../utils/multer';
import {
  saveModel, deleteModel, updateModel, getAllModels, getModel,
} from '../../services/model';
// import * as azureStorage from '../../infra/azureStorage';
import * as diskStorage from '../../infra/diskStorage';

const router = express.Router();

const storageProvider = diskStorage;

router.get('/all', async (req, res) => {
  const modelList = await getAllModels();
  res.json(modelList);
});

router.get('/:id', async (req, res) => {
  const model = await getModel(req.params.id);
  if (!model) {
    res.status(404).send('Model with such id not found');
  } else res.json(model);
});

router.post('/', uploadMiddleware.single('file'), async (req, res) => {
  const { file } = req;
  const modelId = await saveModel(storageProvider)(file.path);
  res.json({ modelId });
});

router.put('/:id', uploadMiddleware.single('file'), async (req, res) => {
  const { file, params: { id } } = req;
  const modelId = await updateModel(storageProvider)(file.path, id);
  res.json({ modelId });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  deleteModel(storageProvider)(id);
  res.sendStatus(200);
});

export default router;
