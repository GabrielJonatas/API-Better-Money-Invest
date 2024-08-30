import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LogService } from 'src/logger/logger.service';

@Injectable()
export class DatabaseService {
  constructor(private logService: LogService) {}

  async find<T>(args: object, repository: Repository<T>) {
    try {
      const entity = await repository.findOne({
        where: { ...args },
      });
      return entity;
    } catch (err) {
      this.logService.error(`Error in findOne method ${err} ${repository}`);
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async findAll<T>(repository: Repository<T>, args?: object) {
    try {
      const entitys = await repository.find({
        where: { ...args },
      });
      return entitys;
    } catch (err) {
      this.logService.error(`Error in find method ${err} ${repository}`);
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async findRelations<T>(
    repository: Repository<T>,
    relations: object,
    condition?: object,
  ) {
    try {
      const entity = await repository.find({
        relations: { ...relations },
        where: { ...condition },
      });
      return entity;
    } catch (err) {
      this.logService.error(
        `Error in relation find method ${err} ${repository}`,
      );
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async saveEntity<T>(args: T, repository: Repository<T>) {
    try {
      await repository.save(args);
    } catch (err) {
      this.logService.error(`Error in save method ${err} ${repository}`);
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async updateEntity<T>(
    args: object,
    args2: object,
    repository: Repository<T>,
  ) {
    try {
      await repository.update({ ...args }, { ...args2 });
    } catch (err) {
      this.logService.error(`Error in update method ${err} ${repository}`);
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async deleteEntity<T>(args: object, repository: Repository<T>) {
    try {
      await repository.delete({ ...args });
    } catch (err) {
      this.logService.error(`Error in delete method ${err} ${repository}`);
      throw new InternalServerErrorException('Unexpected error');
    }
  }
}
