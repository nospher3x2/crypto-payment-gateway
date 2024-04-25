import { Currency } from '@app/shared';

export class ProviderNetworkNotFoundException extends Error {
  constructor(currency: Currency, network: string) {
    super(
      `Provider for ${currency} with network ${network} not found. Please check if the network is correct.`,
    );
  }
}
