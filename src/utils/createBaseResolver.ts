import { Arg, ClassType, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { isAuth } from '../middlewares/isAuth';
import { MiddlewareBaseResolver, PaginationQL } from '../interfaces';
import { sendError, normalizePagination } from './globalMethods';
/**
 * @param suffix Suffix is used on queryNames, example suffix: getAllUser
 * @param entity TypeORM Entity
 * @param inputTypes object with create and update inputTypes
 * @param returnType return classType
 * @param middlewares optional middlewares to be applied in defaults functions
 */
export function createBaseResolver<classType extends ClassType>(
  suffix: string,
  entity: any,
  inputTypes: { create: classType; update: classType; filter?: classType },
  returnType: classType,
  middlewares?: MiddlewareBaseResolver
): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @UseMiddleware(isAuth)
    @Query(() => [returnType], { name: `getAll${suffix}` })
    async getAll(): Promise<ClassType[]> {
      return entity.find();
    }

    @UseMiddleware(isAuth)
    @Query(() => [returnType], { name: `getAll${suffix}Filter` })
    async getAllFiltered(@Arg('data', () => inputTypes.filter || inputTypes.create) data: any): Promise<ClassType[]> {
      return entity.find({ where: data });
    }

    @UseMiddleware(isAuth)
    @Query(() => [returnType], { name: `getAll${suffix}Paginate` })
    async getAllPagination(@Arg('data', () => PaginationQL) data: PaginationQL): Promise<ClassType[]> {
      const { skip, take } = normalizePagination(data);
      return entity.find({ skip, take });
    }

    @UseMiddleware(isAuth)
    @Query(() => returnType, { name: `get${suffix}` })
    async get(@Arg('id', () => String) id: string): Promise<ClassType> {
      return entity.findOne(id);
    }

    @UseMiddleware(isAuth)
    @Mutation(() => returnType, { name: `create${suffix}` })
    async create(@Arg('data', () => inputTypes.create) data: any): Promise<ClassType> {
      if (middlewares && middlewares.create.before) {
        middlewares.create.before(data);
      }
      return entity.create(data).save();
    }

    @UseMiddleware(isAuth)
    @Mutation(() => returnType, { name: `updateBy${suffix}ID` })
    async updateByID(@Arg('data', () => inputTypes.update) data: any, @Arg('id') id: string): Promise<ClassType> {
      const entityData = await this.get(id);
      return this.update(data, entityData);
    }

    @UseMiddleware(isAuth)
    @Mutation(() => [returnType], { name: `createMulti${suffix}` })
    async createMulti(@Arg('data', () => [inputTypes.create]) data: any[]): Promise<ClassType[]> {
      const promises = data.map(obj => entity.create(obj).save());
      const insertedData = await Promise.all(promises);
      return insertedData;
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean, { name: `deleteBy${suffix}ID` })
    async deleteByID(@Arg('id', () => String) id: string): Promise<boolean> {
      const _entity = await this.get(id);
      if (!_entity) {
        sendError(`No data found on Entity: ${suffix}, ID: ${id}`);
      }
      const data = await entity.remove(_entity);
      if (middlewares && middlewares.delete.after) {
        await middlewares.delete.after(id);
      }

      return !!data;
    }

    async update(data: any, entityData: any): Promise<any> {
      for (const field in data) {
        entityData[field] = data[field];
      }
      return entity.save(entityData);
    }
  }

  return BaseResolver;
}
