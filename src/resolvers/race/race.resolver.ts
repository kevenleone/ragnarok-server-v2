import { Query, Resolver } from 'type-graphql';
import { Race } from '../../interfaces';
import { races } from '../../utils/globalMethods';
import { MonsterResolver } from '../monster/monster.resolver';

const MonsterClass = new MonsterResolver();

@Resolver()
export class RaceResolver {
  @Query(() => [Race], { name: `getRaces` })
  async getRaces(): Promise<Race[]> {
    const data: Race[] = [];

    for (const key in races) {
      const race: Race = races[key];
      race.id = Number(key);
      race.representationMonster = await MonsterClass.getMonsterByRace(race.id);
      data.push(race);
    }

    return data;
  }
}
