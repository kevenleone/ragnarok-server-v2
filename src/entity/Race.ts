import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Race extends BaseEntity {
  @PrimaryColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  race: string;
}
