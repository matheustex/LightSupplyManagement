import { Department } from '../../../model/department';
import { DB } from "../../../shared/db";

export class DepartmentsService {
  private db: DB<Department, string> 
  constructor() {
    this.db = new DB(new DB(process.env.DEPARTMENTS_TABLE))
  }

  async createDepartment(dep: Department) {
    try {
      const department = this.db.save(dep);
      return department;
    } catch (error) {
      throw error;
    } 
  }

  async update(event: any) {
    try {
      const body = JSON.parse(event.body);
      const result = await this.db.update(body);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getDepartmanet(id: string) {
    try {
      const result = await this.db.findOne(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async listDepartments(){
    try {
      const departments = this.db.findAll();
      return departments;
    } catch (error) {
      throw error;
    }
  }
}