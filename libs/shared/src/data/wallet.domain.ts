import { randomUUID } from 'crypto';
import { Currency } from '../enums/currency.enum';

export class WalletDomain {
  private readonly _id: string;
  private readonly _address: string;
  private readonly _currency: Currency;
  private readonly _balance: number;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  constructor(wallet: Partial<WalletDomain>) {
    Object.assign(this, wallet);

    if (this._id === undefined) {
      this._id = randomUUID();
    }
  }

  get id(): string {
    return this._id;
  }

  get address(): string {
    return this._address;
  }

  get currency(): Currency {
    return this._currency;
  }

  get balance(): number {
    return this._balance;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
