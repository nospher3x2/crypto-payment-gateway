import { Module } from '@nestjs/common';
import { WalletService } from './services/wallet.service';
import { WalletController } from './controllers/wallet.controller';
import { DatabaseModule } from '@app/shared';
import {
  PrismaWalletMapper,
  PrismaWalletRepository,
  WalletRepository,
} from './repositories';
import { CryptoProviderModule } from '@app/crypto-provider';
@Module({
  imports: [DatabaseModule, CryptoProviderModule],
  providers: [
    WalletService,
    PrismaWalletMapper,
    {
      provide: WalletRepository,
      useClass: PrismaWalletRepository,
    },
  ],
  controllers: [WalletController],
  exports: [WalletService],
})
export class WalletModule {}
