import { In, Repository } from 'typeorm';
import { BusinessEntity } from './business.entity';

export class BusinessRepository {
  constructor(public repository: Repository<BusinessEntity>) {}

  findAllByIds(businessesIds: readonly string[]) {
    return this.repository.find({ where: { id: In(businessesIds) } });
  }
}
