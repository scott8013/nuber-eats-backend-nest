import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Payment } from './entities/payment.entity'
import { PaymentsService } from './payments.service'
import {
  CreatePaymentInput,
  CreatePaymentOutput,
} from './dtos/create-payment.dto'
import { AuthUser } from '../guards/auth-user.decorator'
import { User } from '../users/entities/user.entity'
import { Role } from '../auth/role.decorator'
import { GetPaymentsOutput } from './dtos/get-payments.dto'

@Resolver((of) => Payment)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation((returns) => CreatePaymentOutput)
  @Role(['Owner'])
  createPayment(
    @AuthUser() owner: User,
    @Args('input') createPaymentInput: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    return this.paymentsService.createPayment(owner, createPaymentInput)
  }

  @Query((type) => GetPaymentsOutput)
  @Role(['Owner'])
  getPayments(@AuthUser() user: User): Promise<GetPaymentsOutput> {
    return this.paymentsService.getPayments(user)
  }
}
