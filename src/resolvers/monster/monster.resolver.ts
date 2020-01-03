import { Not } from 'typeorm';
import { Query, Resolver, Arg } from 'type-graphql';
import { Monster } from '../../entity/Monster';
import { MonsterFilter } from './inputs';
import { randomBetween, normalizePagination } from '../../utils/globalMethods';
import { Pagination } from '../../interfaces';

@Resolver(Monster)
export class MonsterResolver {
  @Query(() => [Monster], { name: `getMonsters` })
  async getMonsters(): Promise<Monster[]> {
    const allMonsters = await Monster.createQueryBuilder('monster')
      .select('DISTINCT monster.kName, *')
      .getRawMany();
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

  @Query(() => [Monster], { name: 'getMonsterFilter' })
  async getMonsterFilter(@Arg('data', () => MonsterFilter) data: MonsterFilter): Promise<Monster[]> {
    const page: Pagination = { pageIndex: data.Page };
    delete data.Page;
    const filters: any = data;
    const { skip, take } = normalizePagination(page);

    Object.keys(filters).forEach(key => {
      if (!filters[key]) {
        delete filters[key];
      }
    });
    const allMonsters = await Monster.find({ where: filters, skip, take });
    return allMonsters;
  }

  async getMonsterByRace(id: number): Promise<Monster> {
    const monsters = await this.getMonsterFilter({ Race: id, iName: '', Page: 0 });
    const index = randomBetween(0, monsters.length);
    return monsters[index];
  }

  @Query(() => [Monster], { name: `getMonstersGalery` })
  async getMonstersGalery(): Promise<Monster[]> {
    const races = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const monsters = [];
    for (const race of races) {
      monsters.push(this.getMonsterByRace(race));
    }
    return Promise.all(monsters);
  }

  @Query(() => Monster, { name: `getMonsterRandom` })
  async getMonsterRandom(): Promise<Monster | null> {
    const monsters = await Monster.find({ where: { DropCardid: Not(0) } });
    if (monsters && monsters.length) {
      const index = randomBetween(0, monsters.length);
      return monsters[index];
    }
    return null;
  }
}
