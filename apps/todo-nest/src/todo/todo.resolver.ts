import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { Todo } from './models/todo.model';
import { TodoService } from './todo.service';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(
    private readonly todoService: TodoService,
    private readonly userService: UserService,
  ) {}

  @Query(() => Todo, { nullable: true })
  getTodo(
    @Args('id', { type: () => ID, name: 'getTodo' }) id: string,
  ) {
    return this.todoService.getTodo(id);
  }

  // Learn more about ResolveField: https://github.com/kasir-barati/graphql/blob/main/docs/nestjs.md#shouldWeUseResolveField
  // @ResolveField(() => User, { nullable: true, name: 'AssignedTo' })
  // async getAssignedTo(@Parent() todo: Todo) {
  //   // Since this field is nullable we need to check if that field exits
  //   if (!todo.assignedToId) {
  //     return;
  //   }

  //   return this.userService.getUser(todo.assignedToId);
  // }

  // @ResolveField(() => User, { nullable: true, name: 'CreatedBy' })
  // async getCreatedBy(@Parent() todo: Todo) {
  //   return this.userService.getUser(todo.createdById);
  // }
}
