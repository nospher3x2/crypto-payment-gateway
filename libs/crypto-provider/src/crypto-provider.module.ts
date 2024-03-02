import { Module } from '@nestjs/common';
import { CryptoProviderService } from './services/crypto-provider.service';

@Module({
  providers: [CryptoProviderService],
  exports: [CryptoProviderService],
})
export class CryptoProviderModule {}
