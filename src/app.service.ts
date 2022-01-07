import { Injectable } from '@nestjs/common';
import { hostname } from 'os';

@Injectable()
export class AppService {
  healthy(): string {
    return hostname();
  }
}
