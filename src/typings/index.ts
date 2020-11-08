export enum UserGenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export interface ICognitoAuthInput {
  email: string;
  password: string;
}

export interface ICognitoAuthTokens {
  idToken: string;
  refreshToken: string;
  accessToken: string;
}

export interface ICategoryCreateInput {
  categoryName: string;
}

export interface ICategoryGetInput {
  categoryId: string;
}

export interface ICategoryDeleteInput {
  categoryId: string;
}

export interface ISubCategoryCreateInput {
  subCategoryName: string;
  categoryId: string;
}

export interface ISubCategoryGetInput {
  subCategoryId: string;
}

export interface ISubCategoryDeleteInput {
  subCategoryId: string;
}

export interface IProductCreateInput {
  productName: string;
  productDesc: string;
  categoryId: string;
  subCategoryId: string;
}

export interface IProductUpdateInput {
  productId: string;
  updates: {
    productName?: string;
    productDesc?: string;
    categoryId?: string;
    subCategoryId?: string;
  };
}

export interface IProductGetInput {
  productId: string;
}

export interface IProductGetMatchingInput {
  categoryId: string;
  subCategoryId?: string;
}
