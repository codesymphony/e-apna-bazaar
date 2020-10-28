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