import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './decorators/skipAuth.decorator';
import { LogService } from 'src/logger/logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private logService: LogService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('You need to login.');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (this.matchRoles(roles, payload.role)) {
        request['user'] = payload;
      } else {
        throw new UnauthorizedException(
          'You are not allowed to acess this operation',
        );
      }
    } catch (err) {
      if (
        err.name === 'JsonWebTokenError' ||
        err.name === 'TokenExpiredError' ||
        err instanceof UnauthorizedException
      ) {
        throw new UnauthorizedException(err.message);
      } else {
        this.logService.error(err);
        throw new InternalServerErrorException('Unexpected error');
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private matchRoles(roles: string[], role: string): boolean {
    if (!roles) {
      return true;
    }
    for (const roleAuthorized of roles) {
      if (role == roleAuthorized) {
        return true;
      }
    }
    return false;
  }
}
