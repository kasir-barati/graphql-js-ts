import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { BusinessEntity } from '../business/business.entity';

@Entity()
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  name: string;

  @RelationId((customer: CustomerEntity) => customer.shopAt)
  shopAtId: string;

  @ManyToOne(() => BusinessEntity, (business) => business.customers)
  shopAt: BusinessEntity;
}
