import { Injectable } from "@nestjs/common";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
  ICognitoUserPoolData,
} from 'amazon-cognito-identity-js';

import { CognitoAuthInput, CognitoAuthTokens } from '../../types'

@Injectable()
export class AwsService {
  poolData: ICognitoUserPoolData;

  userPool: CognitoUserPool;

  constructor() {
    this.poolData = {
      UserPoolId: "us-east-2_YjqF6maQn",
      ClientId: "26nmefc6aq827s3ud05fgd6b03",
    }

    this.userPool = new CognitoUserPool(this.poolData)
  }

  addUserToPool(data: CognitoAuthInput) {
    const { email, password } = data;

    const emailData = {
      Name: 'email',
      Value: email
    }

    const emailAttribute = new CognitoUserAttribute(emailData)

    return new Promise((resolve, reject) => {
      this.userPool.signUp(email, password, [emailAttribute], [], (err, data) => {
        if (err) {
          reject(err)
        }
        else {
          console.log(data)
          resolve(data)
        }
      })
    })
  }

  async signIn(input: CognitoAuthInput): Promise<CognitoAuthTokens> {
    const loginDetails = {
      Username: input.email,
      Password: input.password
    }

    const authenticationDetails = new AuthenticationDetails(loginDetails);

    const userDetails = {
      Username: input.email,
      Pool: this.userPool
    }

    const cognitoUser = new CognitoUser(userDetails);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: data => {
          const tokens = {
            idToken: data.getIdToken().getJwtToken(),
            refreshToken: data.getRefreshToken().getToken(),
            accessToken: data.getAccessToken().getJwtToken()
          }
          resolve(tokens)
        },
        onFailure: err => {
          reject(err)
        }
      })
    })
  }
}