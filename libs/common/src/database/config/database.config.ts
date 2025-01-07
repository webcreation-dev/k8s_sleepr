import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', () => {
  const config = {
    type: 'postgres',
    url: process.env.DATASOURCE_URL,
    autoLoadEntities: true,
    synchronize: false,
  } as const satisfies TypeOrmModuleOptions;
  return config;
});
