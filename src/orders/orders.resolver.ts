import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Order } from './entities/order.entity'
import { OrderService } from './orders.service'
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto'
import { Role } from '../auth/role.decorator'
import { AuthUser } from '../guards/auth-user.decorator'
import { User, UserRole } from '../users/entities/user.entity'
import { GetOrdersInput, GetOrdersOutput } from './dtos/get-orders.dot'
import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto'
import { EditOrderInput, EditOrderOutput } from './dtos/edit-order.dto'
import { promises } from 'dns'

@Resolver((of) => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrderService) {}

  @Mutation((returns) => CreateOrderOutput)
  @Role(['Client'])
  async createOrder(
    @AuthUser() customer: User,
    @Args('input')
    createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    return this.ordersService.createOrder(customer, createOrderInput)
  }

  @Query((returns) => GetOrdersOutput)
  @Role(['Any'])
  async getOrders(
    @AuthUser() user: User,
    @Args('input') getOrdersInput: GetOrdersInput,
  ): Promise<GetOrdersOutput> {
    return this.ordersService.getOrders(user, getOrdersInput)
  }

  @Query((returns) => GetOrderOutput)
  @Role(['Any'])
  async getOrder(
    @AuthUser() user: User,
    @Args('input') getOrderInput: GetOrderInput,
  ): Promise<GetOrderOutput> {
    return this.ordersService.getOrder(user, getOrderInput)
  }

  @Mutation((returns) => EditOrderOutput)
  @Role(['Any'])
  async editOrder(
    @AuthUser() user: User,
    @Args('input') editOrderInput: EditOrderInput,
  ): Promise<EditOrderOutput> {
    return this.ordersService.editOrder(user, editOrderInput)
  }
}
