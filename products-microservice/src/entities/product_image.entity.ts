import { Product } from './product.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/BaseEntity';

@Entity('product_images')
export class ProductImage extends BaseEntity {
  @Column()
  url: string;

  @Column({ type: 'int', default: 0 })
  index: number;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
