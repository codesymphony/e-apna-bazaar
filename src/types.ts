export interface CognitoAuthInput {
  email: string;
  password: string;
}

export interface CognitoAuthTokens {
  idToken: string;
  refreshToken: string;
  accessToken: string;
}
