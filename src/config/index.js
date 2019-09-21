import dotenv from 'dotenv';

dotenv.config({ silent: true });

export default {
  PORT: process.env.NODEJS_PORT || 8085,
  HOSTNAME: process.env.NODEJS_IP || 'localhost',
  ENABLE_APIDOCS: process.env.TOGGLE_APIDOC || true,
  ENABLE_CONSOLE_LOG: process.env.ENABLE_LOG_FILE || true,
  ENABLE_LOG_FILE: process.env.ENABLE_LOG_FILE || false,
};
