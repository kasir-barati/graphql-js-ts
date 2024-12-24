import { SinonMock, SinonMockType } from '@testing';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let postRepository: SinonMockType<Repository<Post>>;
  let userRepository: SinonMockType<Repository<User>>;

  beforeEach(async () => {
    postRepository = SinonMock.of(Repository<Post>);
    userRepository = SinonMock.of(Repository<User>);
    service = new PostService(postRepository, userRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
