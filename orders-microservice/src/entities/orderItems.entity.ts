import { Order } from './order.entity';
import { BaseEntity } from './BaseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('order_items')
export class OrderItem extends BaseEntity {
  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'int' })
  productId: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order: Order;
}
