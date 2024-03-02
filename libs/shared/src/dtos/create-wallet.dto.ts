import { Currency, CurrencyNetworkMap } from '../enums';

export class CreateWalletDto {
  public readonly currency: Currency;
  public readonly network: CurrencyNetworkMap[this['currency']];
}
