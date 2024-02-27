import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';

@Module({
  imports: [DatabaseModule],
  providers: [DatabaseModule],
  exports: [DatabaseModule],
})
export class SharedModule {}
