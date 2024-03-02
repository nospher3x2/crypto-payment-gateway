import { Injectable } from '@nestjs/common';
import { Currency } from '@prisma/client';
import {
  PrismaService,
  WalletCredentialDomain,
  WalletDomain,
} from '@app/shared';
import { PrismaWalletMapper } from '../mappers';
import { WalletRepository } from '../wallet.repository';

@Injectable()
export class PrismaWalletRepository implements WalletRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: PrismaWalletMapper,
  ) {}

  public async findAll(): Promise<WalletDomain<Currency>[]> {
    const wallets = await this.prisma.wallet.findMany();
    return wallets.map(this.mapper.toDomain);
  }

  public async findOneById(id: string): Promise<WalletDomain<Currency> | null> {
    const wallet = await this.prisma.wallet.findUnique({
      where: {
        id,
      },
    });
    return wallet ? this.mapper.toDomain(wallet) : null;
  }

  public async saveOne(wallet: WalletDomain<Currency>): Promise<void> {
    const persistence = this.mapper.toPersistence(wallet);
    await this.prisma.wallet.upsert({
      where: {
        id: wallet.id,
      },
      create: persistence,
      update: persistence,
    });
  }

  public async saveOneWithCredential(
    wallet: WalletDomain<Currency>,
    credential: WalletCredentialDomain,
  ): Promise<void> {
    const walletPersistence = this.mapper.toPersistence(wallet);
    const credentialPersistence =
      this.mapper.credentialToPersistence(credential);

    await this.prisma.wallet.upsert({
      where: {
        id: wallet.id,
      },
      create: {
        ...walletPersistence,
        credential: {
          create: credentialPersistence,
        },
      },
      update: {
        ...walletPersistence,
        credential: {
          upsert: {
            where: {
              id: credential.id,
            },
            create: credentialPersistence,
            update: credentialPersistence,
          },
        },
      },
    });
  }

  public async deleteOne(id: string): Promise<boolean> {
    const wallet = await this.prisma.wallet.delete({
      where: {
        id,
      },
    });

    return wallet.id === id;
  }
}
