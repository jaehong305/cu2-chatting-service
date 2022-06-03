import { InputType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class UpdateNicknameInput extends PickType(User, ['nickname'], InputType) {}
