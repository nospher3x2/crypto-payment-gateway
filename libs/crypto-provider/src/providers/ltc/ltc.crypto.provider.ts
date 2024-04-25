import { Injectable } from '@nestjs/common';
import { CreateRandomWalletOutput, CryptoProvider } from '../crypto.provider';
import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import ECPairFactory from 'ecpair';
import { Network } from 'bitcoinjs-lib';
import { ProviderNetworkNotFoundException } from '@app/crypto-provider/exceptions/provider-network-not-found.exception';

const ECPair = ECPairFactory(ecc);
@Injectable()
export class LtcCryptoProvider extends CryptoProvider<'LTC'> {
  public async createRandomWallet(): Promise<CreateRandomWalletOutput<'LTC'>> {
    const network = this.getNetwork();
    const keyPair = ECPair.makeRandom({ network });
    const p2pkh = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: network,
    });

    if (!p2pkh || !p2pkh.address) {
      throw new Error('Failed to create address');
    }

    return {
      currency: 'LTC',
      network: this.network,
      walletAddress: p2pkh.address,
      walletPrivateKey: keyPair.toWIF(),
    };
  }

  private getNetwork(): Network {
    switch (this.network) {
      case 'litecoin':
        return {
          messagePrefix: '\x19Litecoin Signed Message:\n',
          bech32: 'ltc',
          bip32: {
            public: 0x019da462,
            private: 0x019d9cfe,
          },
          pubKeyHash: 0x30,
          scriptHash: 0x32,
          wif: 0xb0,
        };
      default:
        throw new ProviderNetworkNotFoundException('LTC', this.network);
    }
  }
}
