import { Injectable } from '@nestjs/common';
import { CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

@Injectable()
export class AwsService {
  poolData;
  userPool;

  constructor() {
    this.poolData = {
      UserPoolId: 'us-east-2_YjqF6maQn',
      ClientId: '26nmefc6aq827s3ud05fgd6b03',
    };
    console.log(this.poolData);
    this.userPool = new CognitoUserPool(this.poolData);
  }

  addUserToPool(data) {
    const { email, password } = data;
    const emailData = {
      Name: 'email',
      Value: email
    };

    const emailAttribute = new CognitoUserAttribute(emailData);
    console.log(data);
    return new Promise((resolve, reject) => {
      this.userPool.signUp(email, password, [emailAttribute], null, (err, data) => {
        if (err) {
          console.log('errr#####', err);
          reject(err);
        }
        else {
          console.log(data);
          resolve(data);
        }
      });

    });

  }

  async singIn(info) {
    const loginDetails = {
      Username: info.email,
      Password: info.password
    };

    const authenticationDetails = new AuthenticationDetails(loginDetails);

    const userDetails = {
      Username: info.email,
      Pool: this.userPool
    };

    const cognitoUser = new CognitoUser(userDetails);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: data => {
          console.log('inside promise', data);
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