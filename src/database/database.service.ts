import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseService {
  async find<T>(args: object, repository: Repository<T>) {
    try {
      const entity = await repository.findOne({
        where: { ...args },
      });
      return entity;
    } catch (err) {
      console.log('Unexpected error, please check the database system ', err);
    }
  }

  async findAll<T>(repository: Repository<T>, args?: object) {
    try {
      const entitys = await repository.find({
        where: { ...args },
      });
      return entitys;
    } catch (err) {
      console.log('Unexpected error, please check the database system ', err);
    }
  }

  async saveEntity<T>(args: T, repository: Repository<T>) {
    try {
      await repository.save(args);
    } catch (err) {
      console.log('Unexpected error, please check the database system ', err);
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
      console.log('Unexpected error, please check the database system ', err);
    }
  }
}
