import { Currency } from '@app/shared';

export class ProviderNotImplementedException extends Error {
  constructor(currency: Currency) {
    super(`Provider for ${currency} is not implemented yet.`);
  }
}
