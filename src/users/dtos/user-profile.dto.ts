import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { CoreOutput } from '../../common/dtos/output.dto'
import { User } from '../entities/user.entity'

@ArgsType()
export class UserProfileInput {
  @Field(() => Number)
  userId: number
}

@ObjectType()
export class UserProfileOut extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User
}
