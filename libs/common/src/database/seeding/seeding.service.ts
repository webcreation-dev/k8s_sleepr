import { RoleEnum } from '@app/common/enums';
import { Role } from '@app/common/models';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class SeedingService {
  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const rolesRepository = queryRunner.manager.getRepository(Role);

      const categories = await rolesRepository.find();
      await rolesRepository.remove(categories);

      const role1 = rolesRepository.create({ name: RoleEnum.USER });
      const role2 = rolesRepository.create({ name: RoleEnum.MANAGER });

      await rolesRepository.save([role1, role2]);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
