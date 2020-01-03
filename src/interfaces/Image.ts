import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class MonsterImage {
  @Field({ nullable: true })
  animated: string;

  @Field({ nullable: true })
  static: string;

  @Field({ nullable: true })
  art: string;
}
