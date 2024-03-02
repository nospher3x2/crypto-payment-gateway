import { randomUUID } from 'node:crypto';
import { Currency, OrderStatus } from '@prisma/client';
import { TransactionDomain } from './transaction.domain';
import { WalletDomain } from './wallet.domain';

export class OrderDomain {
  readonly #id: string;
  #status: OrderStatus;
  #amount: number;
  #confirmations: number;
  #description: string;
  #walletId: string;
  #externalId: string;
  #expiresAt: Date;
  #createdAt: Date;
  #updatedAt: Date;

  constructor(order: Partial<OrderDomain>) {
    Object.assign(this, order);

    if (this.#id === undefined) {
      this.#id = randomUUID();
    }
  }

  public get id(): string {
    return this.#id;
  }

  public get status(): OrderStatus {
    return this.#status;
  }

  public set status(status: OrderStatus) {
    this.#status = status;
  }

  public get amount(): number {
    return this.#amount;
  }

  public set amount(amount: number) {
    this.#amount = amount;
  }

  public get confirmations(): number {
    return this.#confirmations;
  }

  public set confirmations(confirmations: number) {
    this.#confirmations = confirmations;
  }

  public get description(): string {
    return this.#description;
  }

  public set description(description: string) {
    this.#description = description;
  }

  public get walletId(): string {
    return this.#walletId;
  }

  public set walletId(walletId: string) {
    this.#walletId = walletId;
  }

  public get externalId(): string {
    return this.#externalId;
  }

  public set externalId(externalId: string) {
    this.#externalId = externalId;
  }

  public get expiresAt(): Date {
    return this.#expiresAt;
  }

  public set expiresAt(expiresAt: Date) {
    this.#expiresAt = expiresAt;
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
      status: this.status,
      amount: this.amount,
      confirmations: this.confirmations,
      description: this.description,
      walletId: this.walletId,
      externalId: this.externalId,
      expiresAt: this.expiresAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return this.toJSON();
  }
}

export class OrderWithWalletDomain<T extends Currency> extends OrderDomain {
  #wallet: WalletDomain<T>;

  constructor(order: Partial<OrderWithWalletDomain<T>>) {
    super(order);
    Object.assign(this, order);
  }

  public get wallet(): WalletDomain<T> {
    return this.#wallet;
  }

  public set wallet(wallet: WalletDomain<T>) {
    this.#wallet = wallet;
  }

  public toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      walletId: this.wallet.id,
    };
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return this.toJSON();
  }
}

export class OrderWithTransactionsDomain extends OrderDomain {
  #transactions: TransactionDomain[];

  constructor(order: Partial<OrderWithTransactionsDomain>) {
    super(order);
    this.#transactions = order.transactions || [];
  }

  public get transactions(): TransactionDomain[] {
    return this.#transactions;
  }

  public set transactions(transactions: TransactionDomain[]) {
    this.#transactions = transactions;
  }

  public toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      transactions: this.transactions.map((transaction) =>
        transaction.toJSON(),
      ),
    };
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return this.toJSON();
  }
}

export class OrderWithWalletAndTransactionsDomain<
  T extends Currency,
> extends OrderDomain {
  #wallet: WalletDomain<T>;
  #transactions: TransactionDomain[];

  constructor(order: Partial<OrderWithWalletAndTransactionsDomain<T>>) {
    super(order);
    Object.assign(this, order);
  }

  public get wallet(): WalletDomain<T> {
    return this.#wallet;
  }

  public set wallet(wallet: WalletDomain<T>) {
    this.#wallet = wallet;
  }

  public get transactions(): TransactionDomain[] {
    return this.#transactions;
  }

  public set transactions(transactions: TransactionDomain[]) {
    this.#transactions = transactions;
  }

  public toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      wallet: this.wallet.toJSON(),
      transactions: this.transactions.map((transaction) =>
        transaction.toJSON(),
      ),
    };
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return this.toJSON();
  }
}
