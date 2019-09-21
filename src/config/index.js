import dotenv from 'dotenv';

dotenv.config({ silent: true });

export default {
  PORT: process.env.NODEJS_PORT || 8085,
  HOSTNAME: process.env.NODEJS_IP || 'localhost',
  ENABLE_APIDOCS: process.env.TOGGLE_APIDOC || true,
  ENABLE_CONSOLE_LOG: process.env.ENABLE_LOG_FILE || true,
  ENABLE_LOG_FILE: process.env.ENABLE_LOG_FILE || false,
  STORAGE_ACCOUNT_NAME: process.env.AZURE_STORAGE_ACCOUNT_NAME,
  ACCOUNT_ACCESS_KEY: process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY,
};
