// import {
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   Injectable,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../enums/roles.enum';
// import { Observable } from 'rxjs';
// import { BadRequestException } from '@nestjs/common';
// import { UserEntity } from '../entities/user.entity';

// @Injectable()
// export class UserRoleGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const validRoles: string[] = this.reflector.get(
//       'roles',
//       context.getHandler(),
//     );
//     if (!validRoles) return true;
//     if (validRoles.length === 0) return true;
//     const req = context.switchToHttp().getRequest();
//     const user = req.user as UserEntity;

//     if (!user) throw new BadRequestException('User not found');
//     if (validRoles.includes(user.role)) return true;
//     throw new ForbiddenException(
//       `User ${user.firstName} need a valid role:[${validRoles}]`,
//     );
//   }
// }
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
