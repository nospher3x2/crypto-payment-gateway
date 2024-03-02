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
const ECPair = ECPairFactory(ecc);
@Injectable()
export class BtcCryptoProvider extends CryptoProvider<'BTC'> {
  public async createRandomWallet(): Promise<CreateRandomWalletOutput<'BTC'>> {
    const network = this.getNetwork();
    const keyPair = ECPair.makeRandom({ network });
    const p2wpkh = bitcoin.payments.p2wpkh({
      pubkey: keyPair.publicKey,
      network,
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
        throw new Error(`Unknown network ${this.network}`);
    }
  }
}
