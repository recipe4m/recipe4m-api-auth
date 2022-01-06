import { Injectable } from '@nestjs/common';
import { hostname } from 'os';

@Injectable()
export class SystemService {
  healthy(): string {
    return hostname();
  }
}
