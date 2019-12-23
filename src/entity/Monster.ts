import { Field, ObjectType } from 'type-graphql';
import { PrimaryColumn, BaseEntity, Column, Entity } from 'typeorm';
import { getMonsterRace, statusReferences } from '../utils/globalMethods';
import { MonsterImage } from '../interfaces/Image';
import { StatusReference } from '../interfaces/Monster';
import { MobPlace } from './MobPlace';
import { ItemDB } from './ItemDB';
import defaults from '../config/defaults';

@ObjectType()
@Entity({ synchronize: true })
export class Monster extends BaseEntity {
  @PrimaryColumn()
  @Field()
  id: number;

  @Field()
  race(): string {
    const { race } = getMonsterRace(this.Race);
    return race;
  }

  @Field()
  color(): string {
    const { background } = getMonsterRace(this.Race);
    return background;
  }

  @Field()
  image(): MonsterImage {
    const { id } = this;
    const { MONSTER_IMAGE_URL } = defaults;
    return {
      animated: `${MONSTER_IMAGE_URL}/animated/${id}.gif`,
      static: `${MONSTER_IMAGE_URL}/static/${id}.png`,
    };
  }

  @Field(() => [MobPlace])
  async mobplace(): Promise<MobPlace[]> {
    const places = await MobPlace.find({ where: [{ monster: this.kName }, { mobId: this.id }] });
    return places;
  }

  @Field(() => StatusReference)
  async statusReference(): Promise<StatusReference> {
    const promises = statusReferences(this.LV);
    const data: StatusReference[] = await Promise.all(promises);
    const statusReference: any = {};
    for (const status of data) {
      const [entries] = Object.entries(status);
      const [sts, value] = entries;
      const index: any = sts;
      statusReference[index] = value;
    }
    return statusReference;
  }

  @Field(() => [ItemDB])
  async monsterDrops(): Promise<ItemDB[]> {
    const ids = [
      this.Drop1id,
      this.Drop2id,
      this.Drop3id,
      this.Drop4id,
      this.Drop5id,
      this.Drop6id,
      this.Drop7id,
      this.Drop8id,
      this.Drop9id,
      this.DropCardid,
    ].filter(id => Boolean(id));
    return ItemDB.findByIds(ids);
  }

  @Field(() => String)
  async spawn(map?: string): Promise<string | null> {
    if (map) {
      const mobPlace = await MobPlace.findOne({ where: { mobId: this.id } });
      return mobPlace ? `${mobPlace.quantity} / ${mobPlace.spawn()}` : null;
    }
    return null;
  }

  @Field()
  @Column()
  Sprite: string;

  @Field()
  @Column()
  kName: string;

  @Field()
  @Column()
  iName: string;

  @Field()
  @Column()
  LV: number;

  @Field()
  @Column()
  HP: number;

  @Field()
  @Column()
  SP: number;

  @Field()
  @Column()
  EXP: number;

  @Field()
  @Column()
  JEXP: number;

  @Field()
  @Column()
  Range1: number;

  @Field()
  @Column()
  ATK1: number;

  @Field()
  @Column()
  ATK2: number;

  @Field()
  @Column()
  DEF: number;

  @Field()
  @Column()
  MDEF: number;

  @Field()
  @Column()
  STR: number;

  @Field()
  @Column()
  AGI: number;

  @Field()
  @Column()
  VIT: number;

  @Field()
  @Column()
  INT: number;

  @Field()
  @Column()
  DEX: number;

  @Field()
  @Column()
  LUK: number;

  @Field()
  @Column()
  Range2: number;

  @Field()
  @Column()
  Range3: number;

  @Field()
  @Column()
  Scale: number;

  @Column()
  Race: number;

  @Field()
  @Column()
  Element: number;

  @Field()
  @Column()
  Mode: number;

  @Field()
  @Column()
  Speed: number;

  @Field()
  @Column()
  aDelay: number;

  @Field()
  @Column()
  aMotion: number;

  @Field()
  @Column()
  dMotion: number;

  @Field()
  @Column()
  MEXP: number;

  @Field()
  @Column()
  MVP1id: number;

  @Field()
  @Column()
  MVP1per: number;

  @Field()
  @Column()
  MVP2id: number;

  @Field()
  @Column()
  MVP2per: number;

  @Field()
  @Column()
  MVP3id: number;

  @Field()
  @Column()
  MVP3per: number;

  @Field()
  @Column()
  Drop1id: number;

  @Field()
  @Column()
  Drop1per: number;

  @Field()
  @Column()
  Drop2id: number;

  @Field()
  @Column()
  Drop2per: number;

  @Field()
  @Column()
  Drop3id: number;

  @Field()
  @Column()
  Drop3per: number;

  @Field()
  @Column()
  Drop4id: number;

  @Field()
  @Column()
  Drop4per: number;

  @Field()
  @Column()
  Drop5id: number;

  @Field()
  @Column()
  Drop5per: number;

  @Field()
  @Column()
  Drop6id: number;

  @Field()
  @Column()
  Drop6per: number;

  @Field()
  @Column()
  Drop7id: number;

  @Field()
  @Column()
  Drop7per: number;

  @Field()
  @Column()
  Drop8id: number;

  @Field()
  @Column()
  Drop8per: number;

  @Field()
  @Column()
  Drop9id: number;

  @Field()
  @Column()
  Drop9per: number;

  @Field()
  @Column()
  DropCardid: number;

  @Field()
  @Column()
  DropCardper: number;
}
