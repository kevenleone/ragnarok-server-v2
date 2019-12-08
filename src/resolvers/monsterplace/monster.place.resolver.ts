import { Query, Resolver, Arg } from 'type-graphql';
import { MobPlace } from '../../entity/MobPlace';
import { MonsterPlaceFilter } from './inputs';

@Resolver()
export class MonsterPlaceResolver {
  @Query(() => [MobPlace], { name: `getMonsterPlace` })
  async getMobPlaces(@Arg('data', () => MonsterPlaceFilter) data: MonsterPlaceFilter): Promise<MobPlace[]> {
    const allPlaces = await MobPlace.find({ where: data });
    return allPlaces;
  }
}
