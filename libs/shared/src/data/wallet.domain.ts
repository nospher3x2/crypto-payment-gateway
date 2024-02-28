import { randomUUID } from 'crypto';
import { Currency, CurrencyNetwork } from '../enums';

export class WalletDomain<T extends Currency> {
  private readonly _id: string;
  private readonly _address: string;
  private readonly _currency: T;
  private readonly _network: CurrencyNetwork<T>;
  private _balance: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(wallet: Partial<WalletDomain<T>>) {
    Object.assign(this, wallet);
    if (!this._id) {
      this._id = randomUUID();
    }
  }

  get id(): string {
    return this._id;
  }

  get address(): string {
    return this._address;
  }

  get currency(): T {
    return this._currency;
  }

  get network(): CurrencyNetwork<T> {
    return this._network;
  }

  get balance(): number {
    return this._balance;
  }

  set balance(balance: number) {
    this._balance = balance;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }
}
