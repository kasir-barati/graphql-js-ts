import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PostDto } from '../post/dto/post.dto';
import { PostService } from '../post/post.service';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { Dataloaders } from './dataloader.type';

@Injectable({ scope: Scope.REQUEST })
export class DataloaderService {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  getLoaders(): Dataloaders {
    const postsLoader = this.createPostsLoader();
    const usersLoader = this.createUsersLoader();
    return {
      postsLoader,
      usersLoader,
    };
  }

  private createPostsLoader() {
    return new DataLoader<string, PostDto[]>(
      async (keys: Readonly<string[]>) => {
        return this.postService.getPostsByBatch(keys);
      },
    );
  }

  private createUsersLoader() {
    return new DataLoader<string, UserDto>(
      async (keys: Readonly<string[]>) => {
        return this.userService.getUsersByBatch(keys);
      },
    );
  }
}
