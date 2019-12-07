import { ObjectType, Field } from 'type-graphql';
import { Monster } from '../entity/Monster';

@ObjectType()
export class Race {
  @Field()
  id: number;

  @Field()
  race: string;

  @Field()
  background: string;

  @Field(() => Monster, { nullable: true })
  representationMonster: Monster;
}
