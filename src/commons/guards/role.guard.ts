import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Env } from '@/env';
import { ConfigService } from '@nestjs/config';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtPayload, Role } from '../types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private config: ConfigService<Env, true>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().headers;

    const secretKey = this.config.get('ACCESS_TOKEN', { infer: true });

    const loginPayload: JwtPayload = await this.jwtService.verifyAsync(
      authorization.replace('Bearer ', ''),
      {
        secret: secretKey,
      },
    );

    if (!loginPayload) return false;

    return requiredRoles.some((role) => role === loginPayload.role);
  }
}
