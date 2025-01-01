import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BusinessEntity } from '../business/business.entity';

export const CUSTOMER_TABLE_NAME = 'customers';

@Entity(CUSTOMER_TABLE_NAME)
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  name: string;

  // https://stackoverflow.com/a/61433772/8784518
  // @RelationId is buggy!
  @Column('uuid')
  shopAtId: string;

  @ManyToOne(() => BusinessEntity, (business) => business.customers)
  @JoinColumn({ name: 'shopAtId' })
  shopAt: BusinessEntity;
}
