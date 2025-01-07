import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import dataSource from '@app/common/database/data-source';

@ValidatorConstraint({ async: true })
@Injectable()
export class GenericValidatorConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: any, args: ValidationArguments) {
    const [entityClass, property, validationType] = args.constraints;
    const repository: Repository<any> =
      dataSource.getRepository(entityClass);
    const count = await repository.count({ where: { [property]: value } });

    if (validationType === 'exists') {
      return count > 0;
    } else if (validationType === 'unique') {
      return count === 0;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const [entityClass, property, validationType] = args.constraints;
    if (validationType === 'exists') {
      return `${property} does not exist in ${entityClass.name}`;
    } else if (validationType === 'unique') {
      return `${property} already exists in ${entityClass.name}`;
    }
    return `${property} validation failed in ${entityClass.name}`;
  }
}
