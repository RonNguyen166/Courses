import { BullModule } from '@nestjs/bull';
import { env } from './env.config';

const config = env.REDIS.URL
  ? { redis: { url: env.REDIS.URL } }
  : {
      redis: {
        host: env.REDIS.HOST,
        port: env.REDIS.PORT,
      },
    };

export const queueConfig = BullModule.forRoot(config);
