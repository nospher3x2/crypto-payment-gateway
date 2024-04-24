import { Currency } from '@app/shared';

export class ProviderNotFoundException extends Error {
  constructor(currency: Currency) {
    super(
      `Provider for ${currency} not found. Please check if the network is correct.`,
    );
  }
}
