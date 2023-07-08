const { createServer, proxy } = require('vercel-node-server');
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/main');

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  await app.init();
  return proxy(createServer(app.getHttpAdapter().getInstance()));
};

module.exports = bootstrap();
