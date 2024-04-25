import { Injectable } from '@nestjs/common';
import { CreateRandomWalletOutput, CryptoProvider } from '../crypto.provider';
import * as ecc from 'tiny-secp256k1';
import * as bitcoin from 'bitcoinjs-lib';
import {
  Network,
  bitcoin as bitcoinNetwork,
  regtest,
  testnet,
} from 'bitcoinjs-lib/src/networks';
import ECPairFactory from 'ecpair';
import { ProviderNetworkNotFoundException } from '@app/crypto-provider/exceptions/provider-network-not-found.exception';
import { CurrencyNetwork } from '@app/shared';
const ECPair = ECPairFactory(ecc);
@Injectable()
export class BtcCryptoProvider extends CryptoProvider<'BTC'> {
  private readonly networkData: Network;
  constructor(network: CurrencyNetwork<'BTC'>) {
    super(network);
    this.networkData = this.getNetwork();
  }

  public async createRandomWallet(): Promise<CreateRandomWalletOutput<'BTC'>> {
    const keyPair = ECPair.makeRandom({ network: this.networkData });
    const p2wpkh = bitcoin.payments.p2wpkh({
      pubkey: keyPair.publicKey,
      network: this.networkData,
    });

    if (!p2wpkh || !p2wpkh.address) {
      throw new Error('Failed to create address');
    }

    return {
      currency: 'BTC',
      network: this.network,
      walletAddress: p2wpkh.address,
      walletPrivateKey: keyPair.toWIF(),
    };
  }

  private getNetwork(): Network {
    switch (this.network) {
      case 'bitcoin':
        return bitcoinNetwork;
      case 'regtest':
        return regtest;
      case 'testnet':
        return testnet;
      default:
        throw new ProviderNetworkNotFoundException('BTC', this.network);
    }
  }
}
