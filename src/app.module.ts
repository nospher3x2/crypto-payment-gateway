import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [SharedModule, WalletModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
