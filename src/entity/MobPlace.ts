import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { convertTimeSpawn, defaults } from '../utils/globalMethods';
import { Monster } from './Monster';

@ObjectType()
@Entity()
export class MobPlace extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  map: string;

  @Field({ nullable: true })
  spawn(): string {
    return convertTimeSpawn(this.spawntime);
  }

  @Field(() => [Monster])
  async monsters(): Promise<Monster[]> {
    const Mobs = await MobPlace.createQueryBuilder('m')
      .where({ map: this.map })
      .select('m.mobId', 'mobId')
      .getRawMany();
    return Monster.findByIds(Mobs.map(mob => Number(mob.mobId)));
  }

  @Field({ nullable: true })
  img(): string {
    return `${defaults.MAP_URL}/${this.map}.gif`;
  }

  @Field({ nullable: true })
  @Column({ nullable: true })
  monster: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  mobId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  quantity: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  spawntime: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  unknown1: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  unknown2: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  ambience: string;
}
