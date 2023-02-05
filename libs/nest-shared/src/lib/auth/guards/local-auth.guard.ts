import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard to protect authenticated routes (like login)
 * Consummer must given valid email & password
 * @see PassportLocal
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
