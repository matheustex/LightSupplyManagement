import { DepartmentsService } from './departments.service';
import { MessageUtil } from '../../../shared/message';
import { Context } from 'aws-lambda';
import { Department } from './departments.model';

export class DepartmentsController {
  constructor (private readonly service: DepartmentsService) {}

  async save (event: any, context?: Context) {
    const params: Department = JSON.parse(event.body);

    try {
      const result = await this.service.createDepartment(params);

      return MessageUtil.success(result);
    } catch (err) {
      return MessageUtil.error(err.code, err.message);
    }
  }

  async update (event: any) {
    const body: object = JSON.parse(event.body);

    try {
      const result = await this.service.update(body);
      return MessageUtil.success(result);
    } catch (err) {
      return MessageUtil.error(err.code, err.message);
    }
  }

  async get (event: any) {
    try {
      const id: string = event.pathParameters.id;
      const result = await this.service.getDepartmanet(id);

      return MessageUtil.success(result);
    } catch (err) {
      return MessageUtil.error(err.code, err.message);
    }
  }

  async findAll () {
    try {
      const result = await this.service.listDepartments();

      return MessageUtil.success(result);
    } catch (err) {
      return MessageUtil.error(err.code, err.message);
    }
  }
}