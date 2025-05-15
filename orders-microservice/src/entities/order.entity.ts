import { BaseEntity } from './BaseEntity';
import { OrderItem } from './orderItems.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('orders')
export class Order extends BaseEntity {
  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'int' })
  userId: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
    eager: true,
  })
  orderItems: OrderItem[];
}
