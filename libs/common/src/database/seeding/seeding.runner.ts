import { NestFactory } from '@nestjs/core';
import { SeedingModule } from './seeding.module';
import { SeedingService } from './seeding.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedingModule);
  const seedingService = app.get(SeedingService);

  // Exécuter la méthode de seeding
  await seedingService.seed();

  // Fermer l'application
  await app.close();
}

bootstrap();
