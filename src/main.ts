import 'dotenv/config'

import { NestFactory } from '@nestjs/core';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import morgan from 'morgan';
import kill from 'kill-port';
import cors from 'cors'
import 'node-fetch';

import { AppModule } from './app.module';

const port = process.env.PORT || 8080;

const winstonLogger = WinstonModule.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
    new winston.transports.File({
      filename: 'info.log',
      level: 'info',
      format: winston.format.json()
    }),
    new winston.transports.File({
      filename: 'errors.log',
      level: 'error',
      format: winston.format.json()
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: 'exceptions.log',
      format: winston.format.json()
    })
  ]
});

const myStream = {
  write: (text: string) => {
    winstonLogger.log(text);
  }
};

async function bootstrap() {
  await kill(port, 'tcp');

  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });

  app.use(morgan(
    ':method :url :status :response-time ms - :res[content-length] ":referrer" ":user-agent"',
    {
      stream: myStream,
    }
  ))
  app.use(cors());

  await app.listen(port);
  winstonLogger.log(`Server running on http://localhost:${port}`, 'Bootstrap')
}
bootstrap();
