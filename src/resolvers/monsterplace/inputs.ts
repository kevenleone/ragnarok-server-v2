import { Field, InputType } from 'type-graphql';

@InputType()
export class MonsterPlaceFilter {
  @Field({ nullable: true })
  mobId: number;
}
