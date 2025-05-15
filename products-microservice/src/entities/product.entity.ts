import { Column, Entity, OneToMany } from 'typeorm';
import { ProductImage } from './product_image.entity';
import { BaseEntity } from 'src/common/entities/BaseEntity';

@Entity('products')
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  stock: number;

  sellerId: number;

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
  })
  images: ProductImage[];

  @Column({ default: true })
  isActive: boolean;
}
