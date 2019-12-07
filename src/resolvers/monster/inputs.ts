import { Field, InputType } from 'type-graphql';

@InputType()
export class MonsterFilter {
  @Field({ nullable: true })
  iName: string;

  @Field({ nullable: true })
  Race: number;

  @Field({ nullable: true })
  Page: number;
}
