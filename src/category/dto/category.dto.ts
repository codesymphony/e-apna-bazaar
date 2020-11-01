import { Field, ObjectType } from '@nestjs/graphql';

import { ProductDTO } from '@/products/dto/product.dto';
import { SubCategoryDTO } from '@/sub-category/dto/sub-category.dto';

@ObjectType()
export class CategoryDTO {
  @Field()
  readonly id!: string;

  @Field()
  readonly categoryName!: string;

  @Field()
  readonly createdAt!: string;

  @Field()
  readonly updatedAt!: string;

  @Field(() => [ProductDTO], { nullable: true })
  products?: ProductDTO[];

  @Field(() => [SubCategoryDTO], { nullable: true })
  subCategories?: SubCategoryDTO[];
}