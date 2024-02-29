import crypto from 'node:crypto';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    if (!apiKey) {
      throw new UnauthorizedException();
    }

    try {
      const hashedApiKey = this.getValueHashedInSha512(apiKey);
      return hashedApiKey === process.env.API_KEY;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private getValueHashedInSha512(value: string): string | undefined {
    return crypto.createHash('sha512').update(value).digest('hex');
  }
}
