import { DepartmentsService } from './resources/departments.service';
import { DepartmentsController } from './resources/departments.controller';
import { Context, APIGatewayProxyHandler } from 'aws-lambda';

const service: DepartmentsService = new DepartmentsService();
const departmentsController = new DepartmentsController(service);

export const createDepartment: any = (event: any, context: Context) => {
  return departmentsController.save(event, context);
};

export const updateDepartment: APIGatewayProxyHandler = (event: any) => departmentsController.update(event)

export const listDepartment: APIGatewayProxyHandler = () => departmentsController.findAll()

export const getDepartment: APIGatewayProxyHandler = (event: any, context: Context) => {
  return departmentsController.get(event);
};