import { Field, ObjectType } from '@nestjs/graphql';

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
}