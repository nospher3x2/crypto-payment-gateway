import { Body, Controller, Get, Post } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import { CreateWalletDto } from '@app/shared';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  public async findAll() {
    return this.walletService.createOne({
      currency: 'BTC',
      network: 'bitcoin',
    });
  }

  public async findOneById(id: string) {
    return this.walletService.findOneById(id);
  }

  @Post()
  public async createOne(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createOne(createWalletDto);
  }
}
