export interface DBBase<T, ID> {
  save(t: T): Promise<T>;
  update(t: T): Promise<any>;
  findOne(id: ID): Promise<any>;
  findAll(): Promise<any[]>;
  delete(id: ID): any;
}