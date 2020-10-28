import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SubCategoryDTO {
  @Field()
  readonly id!: string;

  @Field()
  readonly subCategoryName!: string;

  @Field()
  readonly categoryId!: string;

  @Field()
  readonly createdAt!: string;

  @Field()
  readonly updatedAt!: string;
}