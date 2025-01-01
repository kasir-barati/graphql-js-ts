import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  getPosts() {
    return this.postRepository.repository.find({ take: 5 });
  }

  async getPostsByBatch(
    userIds: Readonly<string[]>,
  ): Promise<PostDto[][]> {
    console.log('\n\t========getPostsByBatch========\n');

    const posts = await this.postRepository.findAllByUserIds(userIds);
    const mappedResults = this.mapPostsToUserIds(posts, userIds);

    return mappedResults;
  }

  /**
   * @description
   * When using Dataloader we have to fulfill 2 requirements:
   * 1. `?? null` part: The length of the returned array must be equal to the length of the supplied keys.
   *    We need to return `null` if a post is not found for a given user ID.
   * 2. `posts.filter` part: The returned values must be ordered in the same order as the supplied keys.
   *    E.g. if the keys are `[User1, User3, User4]`, the value must be something like `[postOfUser1, postOfUser3, postOfUser4]`.
   *    The data source might not return them in the same order, so we have to reorder them.
   *
   * **NOTE** that here I did not flatten the array unlike what I did in the `user.service.ts`. Because there we could only have one user for each post (author), but a user can have many posts!
   */
  private mapPostsToUserIds(
    posts: Readonly<Post[]>,
    userIds: Readonly<string[]>,
  ): Post[][] {
    return userIds.map((userId) => {
      const filteredPosts = posts.filter(
        (post) => post.authorId === userId,
      );

      return filteredPosts ?? null;
    });
  }
}
