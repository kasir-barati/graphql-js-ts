import { Injectable } from '@nestjs/common';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUser(id: string) {
    return this.userRepository.read(id);
  }

  createUser(inputDto: CreateUserInputDto) {
    return this.userRepository.create(inputDto.username);
  }
}
