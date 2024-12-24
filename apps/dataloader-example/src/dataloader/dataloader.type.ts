import Dataloader from 'dataloader';
import { PostDto } from '../post/dto/post.dto';
import { UserDto } from '../user/dto/user.dto';

export interface Dataloaders {
  postsLoader: Dataloader<string, PostDto[]>;
  usersLoader: Dataloader<string, UserDto>;
}
export interface GraphQLResolveContext {
  loaders: Dataloaders;
}
