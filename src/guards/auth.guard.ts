import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import {
  CognitoIdToken,
  CognitoAccessToken,
  CognitoRefreshToken,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import jwt from 'jwt-decode';

import { UserService } from '@/user/user.service';
import { Context } from '@/decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('UserService') private readonly _userService: UserService,
    private readonly _reflector: Reflector,
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    let request: Request;
    let headers: any;
 
    if (context.getType() === 'http') {
      const [req] = context.getArgs();
      request = req;
      headers = request.headers;
    } else {
      const ctx: Context = GqlExecutionContext.create(context).getContext();
      request = ctx.request;
      headers = ctx.headers;
    }

    const { idtoken, accesstoken, refreshtoken } = headers;

    if (idtoken && accesstoken && refreshtoken) {
      const decoded: any = jwt(idtoken);

      const idToken = new CognitoIdToken({
        IdToken: idtoken,
      });
      const accessToken = new CognitoAccessToken({
        AccessToken: accesstoken,
      });
      const refreshToken = new CognitoRefreshToken({
        RefreshToken: refreshtoken,
      });
      const tokenData = {
        IdToken: idToken,
        RefreshToken: refreshToken,
        AccessToken: accessToken,
      };
      const session = new CognitoUserSession(tokenData);

      if (session.isValid()) {
        const user = await this._userService.findByEmail(decoded.email);
        
        if (!user.isVerified) {
          throw new HttpException('User not verified.', HttpStatus.UNAUTHORIZED);
        }

        request.headers.user = JSON.stringify(user);

        return true;
      } else {
        return false;
      }
    }

    return false;
  }
}
