export const NOT_FOUND = (entity: string) => `${entity} not found.`;
export const ALREADY_EXISTS = (entity: string) => `${entity} already exists.`;

export const COMMON_ERRORS = {
  NOT_FOUND,
  ALREADY_EXISTS,
} as const;

export const USER_ERRORS = {
  NOT_FOUND: NOT_FOUND('Category'),
  ALREADY_EXISTS: ALREADY_EXISTS('Category'),
  ALREADY_EXISTS_WITH_EMAIL: ALREADY_EXISTS('User with email'),
} as const;

export const CATEGORY_ERRORS = {
  NOT_FOUND: NOT_FOUND('Category'),
  ALREADY_EXISTS: ALREADY_EXISTS('Category')
} as const;