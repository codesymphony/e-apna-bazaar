/* eslint-disable @typescript-eslint/naming-convention */
import { createParamDecorator } from '@nestjs/common';
import { CustomParamFactory } from '@nestjs/common/interfaces';
import { GraphQLResolveInfo } from 'graphql';
import { Request, Response } from 'express';

export interface Context {
  headers: any;
  request: Request;
  response: Response;
}

export const contextFactory: CustomParamFactory = (
  data: any,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [root, args, context, info]: [Record<string, any>, any, any, GraphQLResolveInfo],
): Context => context;

// tslint:disable-next-line: variable-name
export const Context = createParamDecorator(contextFactory);
