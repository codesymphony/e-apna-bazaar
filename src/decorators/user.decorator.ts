import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { UserEntity } from '@/user/user.entity';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context).getContext();
    const { headers } = ctx;

    return JSON.parse(headers.user || '{}');
  },
);

export type User = UserEntity;
