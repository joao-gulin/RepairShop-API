import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom decorator to extract the user object from the request.
 * Assumes JwtAuthGuard has successfully populated request.user.
 */
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
      console.error(
        'GetUser decorator used without a valid user on request object. Ensure JwtAuthGuard is active.',
      );
    }

    // If data is provided (e.g., @GetUser('userId')), return that specific property
    if (data) {
      return request.user[data];
    }
    // Otherwise, return the whole user object
    return request.user;
  },
);
