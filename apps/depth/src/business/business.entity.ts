import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from '../customer/customer.entity';

export const BUSINESS_TABLE_NAME = 'businesses';

@Entity(BUSINESS_TABLE_NAME)
export class BusinessEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @OneToMany(() => CustomerEntity, (customer) => customer.shopAt)
  customers: CustomerEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
