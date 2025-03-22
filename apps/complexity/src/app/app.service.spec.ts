import { SinonMock, SinonMockType } from '@testing';
import { Repository } from 'typeorm';

import { AppService } from './app.service';
import { Post } from './entities/post.entity';
import { User } from './entities/user.entity';

describe('AppService', () => {
  let service: AppService;
  let postRepository: SinonMockType<Repository<Post>>;
  let userRepository: SinonMockType<Repository<User>>;

  beforeEach(async () => {
    postRepository = SinonMock.of(Repository<Post>);
    userRepository = SinonMock.of(Repository<User>);
    service = new AppService(postRepository, userRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
