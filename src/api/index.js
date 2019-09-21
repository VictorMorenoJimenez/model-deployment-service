import express from 'express';
import path from 'path';
import YAML from 'yamljs';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import swaggerUi from 'swagger-ui-express';
import indexRouter from './routes';
import config from '../config';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

if (config.ENABLE_APIDOCS) {
  const swaggerDocument = YAML.load(
    path.join(__dirname, '../../apidoc.yaml'),
  );
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use('/', indexRouter);

export default app;
