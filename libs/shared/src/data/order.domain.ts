import { randomUUID } from 'crypto';
import { Currency } from '../enums/currency.enum';
import { OrderStatus } from '../enums/order.status.enum';
import { TransactionDomain } from './transaction.domain';

export class OrderDomain {
  private readonly _id: string;
  private _status: OrderStatus;
  private _currency: Currency;
  private _amount: number;
  private _confirmations: number;
  private _description: string;
  private _address: string;
  private _expiresAt: number;
  private _externalId: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(order: Partial<OrderDomain>) {
    Object.assign(this, order);

    if (this._id === undefined) {
      this._id = randomUUID();
    }
  }

  get id(): string {
    return this._id;
  }

  get status(): OrderStatus {
    return this._status;
  }

  set status(status: OrderStatus) {
    this._status = status;
  }

  get currency(): Currency {
    return this._currency;
  }

  set currency(currency: Currency) {
    this._currency = currency;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(amount: number) {
    this._amount = amount;
  }

  get confirmations(): number {
    return this._confirmations;
  }

  set confirmations(confirmations: number) {
    this._confirmations = confirmations;
  }

  get description(): string {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  get address(): string {
    return this._address;
  }

  set address(address: string) {
    this._address = address;
  }

  get expiresAt(): number {
    return this._expiresAt;
  }

  set expiresAt(expiresAt: number) {
    this._expiresAt = expiresAt;
  }

  get externalId(): string {
    return this._externalId;
  }

  set externalId(externalId: string) {
    this._externalId = externalId;
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

export class OrderWithTransactionsDomain extends OrderDomain {
  private _transactions: TransactionDomain[];

  constructor(order: Partial<OrderWithTransactionsDomain>) {
    super(order);
    this._transactions = [];
  }

  get transactions(): TransactionDomain[] {
    return this._transactions;
  }

  set transactions(transactions: TransactionDomain[]) {
    this._transactions = transactions;
  }
}
