import { Query, Resolver, Arg } from 'type-graphql';
import { MobPlace } from '../../entity/MobPlace';
import { MonsterPlaceFilter } from './inputs';
import { Pagination } from '../../interfaces/Pagination';
import { initPagination, normalizePagination, defaults } from '../../utils/globalMethods';

@Resolver()
export class MonsterPlaceResolver {
  @Query(() => [MobPlace], { name: `getMonsterPlace` })
  async getMobPlaces(data?: MonsterPlaceFilter, page?: Pagination): Promise<MobPlace[]> {
    if (!page) {
      page = initPagination(page);
    }
    const { skip, take } = normalizePagination(page);
    const places = await MobPlace.createQueryBuilder('mobplace')
      .where(data || {})
      .select('DISTINCT mobplace.map')
      .skip(skip)
      .take(take)
      .getRawMany();
    return places.map((place, id) => ({ id: Number(id), img: `${defaults.MAP_URL}/${place.map}.gif`, ...place }));
  }

  @Query(() => [MobPlace], { name: `getMonsterPlaceFilter` })
  async getMobPlacesFilter(@Arg('data', () => MonsterPlaceFilter) data: MonsterPlaceFilter): Promise<MobPlace[]> {
    const page: Pagination = { pageIndex: data.Page || 1 };
    delete data.Page;
    return this.getMobPlaces(data, page);
  }
}
