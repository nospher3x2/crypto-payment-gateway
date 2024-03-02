import { randomUUID } from 'node:crypto';
import { Currency, CurrencyNetwork } from '../enums';
import { WalletCredentialDomain } from './wallet.credential';

export class WalletDomain<T extends Currency> {
  readonly #id: string;
  #address: string;
  #currency: T;
  #network: CurrencyNetwork<T>;
  #balance: number;
  #credentialId: string;
  #createdAt: Date;
  #updatedAt: Date;

  constructor(wallet: Partial<WalletDomain<T>>) {
    Object.assign(this, wallet);
    if (!this.#id) {
      this.#id = randomUUID();
    }
  }

  public get id(): string {
    return this.#id;
  }

  public get address(): string {
    return this.#address;
  }

  public set address(address: string) {
    this.#address = address;
  }

  public get currency(): T {
    return this.#currency;
  }

  public set currency(currency: T) {
    this.#currency = currency;
  }

  public get network(): CurrencyNetwork<T> {
    return this.#network;
  }

  public set network(network: CurrencyNetwork<T>) {
    this.#network = network;
  }

  public get balance(): number {
    return this.#balance;
  }

  public set balance(balance: number) {
    this.#balance = balance;
  }

  public get credentialId(): string {
    return this.#credentialId;
  }

  public set credentialId(credentialId: string) {
    this.#credentialId = credentialId;
  }

  public get createdAt(): Date {
    return this.#createdAt;
  }

  public set createdAt(createdAt: Date) {
    this.#createdAt = createdAt;
  }

  public get updatedAt(): Date {
    return this.#updatedAt;
  }

  public set updatedAt(updatedAt: Date) {
    this.#updatedAt = updatedAt;
  }

  public toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      address: this.address,
      currency: this.currency,
      network: this.network,
      balance: this.balance,
      credentialId: this.credentialId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return this.toJSON();
  }
}

export class WalletWithCredentialDomain<
  T extends Currency,
> extends WalletDomain<T> {
  #credential: WalletCredentialDomain;

  constructor(wallet: Partial<WalletWithCredentialDomain<T>>) {
    super(wallet);
    Object.assign(this, wallet);
  }

  public get credential(): WalletCredentialDomain {
    return this.#credential;
  }

  public set credential(credential: WalletCredentialDomain) {
    this.#credential = credential;
  }

  public toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      credential: this.credential.toJSON(),
    };
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return this.toJSON();
  }
}
