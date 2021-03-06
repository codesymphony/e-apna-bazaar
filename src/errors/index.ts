export const NOT_FOUND = (entity: string) => `${entity} not found.`;
export const ALREADY_EXISTS = (entity: string) => `${entity} already exists.`;

export const COMMON_ERRORS = {
  NOT_FOUND,
  ALREADY_EXISTS,
} as const;

export const USER_ERRORS = {
  NOT_FOUND: NOT_FOUND('User'),
  ALREADY_EXISTS: ALREADY_EXISTS('User'),
  ALREADY_EXISTS_WITH_EMAIL: ALREADY_EXISTS('User with email'),
} as const;

export const CATEGORY_ERRORS = {
  NOT_FOUND: NOT_FOUND('Category'),
  ALREADY_EXISTS: ALREADY_EXISTS('Category')
} as const;

export const SUB_CATEGORY_ERRORS = {
  NOT_FOUND: NOT_FOUND('Subcategory'),
  ALREADY_EXISTS_FOR_CATEGORY: ALREADY_EXISTS('Subcategory for this category')
} as const;

export const PRODUCT_ERRORS = {
  NOT_FOUND: NOT_FOUND('Product'),
} as const;