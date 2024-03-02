import {
  Currency,
  CurrencyNetwork,
  WalletCredentialDomain,
  WalletDomain,
} from '@app/shared';
import { Prisma, Wallet as PrismaWallet } from '@prisma/client';

export class PrismaWalletMapper {
  public toDomain(wallet: PrismaWallet): WalletDomain<typeof wallet.currency> {
    return new WalletDomain<typeof wallet.currency>({
      id: wallet.id,
      address: wallet.address,
      currency: wallet.currency,
      network: wallet.network as CurrencyNetwork<typeof wallet.currency>,
      balance: wallet.balance.toNumber(),
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
    });
  }

  public toPersistence(
    wallet: WalletDomain<Currency>,
  ): Prisma.WalletCreateInput {
    return {
      id: wallet.id,
      address: wallet.address,
      currency: wallet.currency,
      network: wallet.network,
      balance: wallet.balance,
      credential: {
        connect: {
          id: wallet.credentialId,
        },
      },
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt,
    };
  }

  public credentialToPersistence(
    credential: WalletCredentialDomain,
  ): Prisma.WalletCredentialCreateInput {
    return {
      id: credential.id,
      privateKey: credential.privateKey,
      createdAt: credential.createdAt,
      updatedAt: credential.updatedAt,
    };
  }
}
