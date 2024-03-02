import { Injectable } from '@nestjs/common';
import {
  CreateWalletDto,
  Currency,
  WalletCredentialDomain,
  WalletDomain,
} from '@app/shared';
import { WalletRepository } from '../repositories';
import { CryptoProviderService } from '@app/crypto-provider';

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly cryptoProviderService: CryptoProviderService,
  ) {}

  public async findAll(): Promise<WalletDomain<Currency>[]> {
    return this.walletRepository.findAll();
  }

  public async findOneById(id: string): Promise<WalletDomain<Currency> | null> {
    return this.walletRepository.findOneById(id);
  }

  public async createOne(
    createWalletDto: CreateWalletDto,
  ): Promise<WalletDomain<typeof createWalletDto.currency>> {
    const cryptoProvider = this.cryptoProviderService.getProvider(
      createWalletDto.currency,
      createWalletDto.network,
    );

    const cryptoWallet = await cryptoProvider.createRandomWallet();
    const walletCredential = new WalletCredentialDomain({
      privateKey: cryptoWallet.walletPrivateKey,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const wallet = new WalletDomain<typeof createWalletDto.currency>({
      address: cryptoWallet.walletAddress,
      currency: cryptoWallet.currency,
      network: cryptoWallet.network,
      balance: 0,
      credentialId: walletCredential.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.walletRepository.saveOneWithCredential(wallet, walletCredential);
    return wallet;
  }
}
