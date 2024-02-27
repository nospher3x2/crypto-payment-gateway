import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';

@Module({
  imports: [SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
