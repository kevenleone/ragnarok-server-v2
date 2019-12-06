import { Query, Resolver, Arg } from 'type-graphql';
import { Monster } from '../../entity/Monster';

@Resolver(Monster)
export class MonsterResolver {
  @Query(() => [Monster], { name: `getMonsters` })
  async getMonsters(): Promise<Monster[]> {
    const allMonsters = await Monster.find();
    console.log(allMonsters[0]);
    return allMonsters;
  }

  @Query(() => Monster, { name: 'getMonster' })
  async getMonster(@Arg('id', () => Number) id: number): Promise<Monster> {
    const monster = await Monster.findOne({ where: { id } });
    if (monster) {
      return monster;
    } else {
      throw new Error('Monster not found');
    }
  }
}
