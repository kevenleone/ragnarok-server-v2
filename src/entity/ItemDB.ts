import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import defaults from '../config/defaults';

@ObjectType()
@Entity({ name: 'item_db' })
export class ItemDB extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  name_english: string;

  @Field()
  @Column()
  name_japanese: string;

  @Field()
  icon(): string {
    const { CARD_URL, ITEM_URL } = defaults;
    const isCard = this.name_japanese.includes('Carta');
    return isCard ? CARD_URL : `${ITEM_URL}/${this.id}.gif`;
  }

  @Field({ nullable: true })
  @Column({ nullable: true })
  type: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  price_buy: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  price_sell: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  weight: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  atk: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  matk: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  defence: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  range: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  slots: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  equip_jobs: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  equip_upper: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  equip_genders: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  equip_locations: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  weapon_level: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  equip_level_min: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  equip_level_max: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  refineable: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  view: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bindonequip: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  forceserial: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  buyingstore: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  delay: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  trade_flag: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  trade_group: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nouse_flag: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nouse_group: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  stack_amount: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  stack_flag: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  sprite: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  script: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  equip_script: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  unequip_script: string;
}
