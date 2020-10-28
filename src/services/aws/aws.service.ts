import { Injectable } from '@nestjs/common';
import {
  CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser
} from 'amazon-cognito-identity-js';

import { ICognitoAuthInput, ICognitoAuthTokens } from '@typings/index';

@Injectable()
export class AwsService {
  poolData;
  userPool: CognitoUserPool;

  constructor() {
    this.poolData = {
      UserPoolId: 'us-east-2_YjqF6maQn',
      ClientId: '26nmefc6aq827s3ud05fgd6b03',
    };

    this.userPool = new CognitoUserPool(this.poolData);
  }

  addUserToPool(data: ICognitoAuthInput): Promise<string | undefined> {
    const { email, password } = data;

    const emailData = {
      Name: 'email',
      Value: email
    };

    const emailAttribute = new CognitoUserAttribute(emailData);

    return new Promise((resolve, reject) => {
      this.userPool.signUp(email, password, [emailAttribute], [], (error, data) => {
        if (error) {
          return reject(error);
        }

        return resolve(data?.codeDeliveryDetails.Destination);
      });
    });
  }

  async signIn(data: ICognitoAuthInput): Promise<ICognitoAuthTokens> {
    const loginDetails = {
      Username: data.email,
      Password: data.password
    };

    const authenticationDetails = new AuthenticationDetails(loginDetails);

    const userDetails = {
      Username: data.email,
      Pool: this.userPool
    };

    const cognitoUser = new CognitoUser(userDetails);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: data => {
          const tokens = {
            idToken: data.getIdToken().getJwtToken(),
            refreshToken: data.getRefreshToken().getToken(),
            accessToken: data.getAccessToken().getJwtToken()
          };
          resolve(tokens);
        },
        onFailure: err => {
          reject(err);
        }
      });
    });
  }
}