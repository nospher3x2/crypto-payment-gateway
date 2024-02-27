import { randomUUID } from 'crypto';
import { OrderStatus } from '../enums/order.status.enum';
import { TransactionDomain } from './transaction.domain';
import { WalletDomain } from './wallet.domain';

export class OrderDomain {
  private readonly _id: string;
  private _status: OrderStatus;
  private _amount: number;
  private _confirmations: number;
  private _description: string;
  private _wallet: WalletDomain;
  private _externalId: string;
  private _expiresAt: Date;
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

  get wallet(): WalletDomain {
    return this._wallet;
  }

  set wallet(wallet: WalletDomain) {
    this._wallet = wallet;
  }

  get externalId(): string {
    return this._externalId;
  }

  set externalId(externalId: string) {
    this._externalId = externalId;
  }

  get expiresAt(): Date {
    return this._expiresAt;
  }

  set expiresAt(expiresAt: Date) {
    this._expiresAt = expiresAt;
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
