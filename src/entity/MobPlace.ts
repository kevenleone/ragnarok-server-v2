import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { convertTimeSpawn } from '../utils/globalMethods';

@ObjectType()
@Entity()
export class MobPlace extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  map: string;

  @Field()
  spawn(): string {
    return convertTimeSpawn(this.spawntime);
  }

  @Field()
  @Column()
  monster: string;

  @Field()
  @Column()
  mobId: string;

  @Field()
  @Column()
  quantity: number;

  @Field()
  @Column()
  spawntime: number;

  @Field()
  @Column()
  unknown1: number;

  @Field()
  @Column()
  unknown2: number;

  @Field()
  @Column()
  ambience: string;
}
