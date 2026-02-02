import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('token invalid');
    try {
      const payload = this.jwt.verify(token, {
        clockTolerance: 7200, // 2 soat vaqt farqi
      });
      request.admin = payload.user;
    } catch (e) {
      Logger.error(e.message ?? '');
      throw new UnauthorizedException('token invalid');
    }
    return true;
  }
}
