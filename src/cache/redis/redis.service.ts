import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';
import { Env } from '@/env';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor(config: ConfigService<Env, true>) {
    super({
      host: config.get('REDIS_HOST', { infer: true }),
      port: config.get('REDIS_PORT', { infer: true }),
      db: config.get('REDIS_DB', { infer: true }),
    });

    super.on('error', (err) => {
      console.log('Error on Redis');
      console.log(err);
      process.exit(1);
    });

    super.on('connect', () => {
      console.log('Redis connected');
    });
  }

  onModuleDestroy() {
    return this.disconnect();
  }
}
