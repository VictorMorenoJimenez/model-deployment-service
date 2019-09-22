const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const isProduction = () => process.env.NODE_ENV === 'production';

export { normalizePort, isProduction };
