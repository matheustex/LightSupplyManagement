import { Model } from '../../../shared/interfaces/model.interface';
export class Department implements Model{
  id: string;
  name: string;
  type: string;
  created: string;
  updated: string;

  GetID() {
    return this.id;
  }
  GetCreated() {
    return this.created;
  }
  GetUpdated() {
    return this.updated;
  }
}