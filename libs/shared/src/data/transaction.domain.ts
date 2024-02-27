export class TransactionDomain {
  private readonly _txid: string;
  private readonly _amount: number;
  private readonly _from: string;
  private readonly _confirmations: number;
  private readonly _orderId: string;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  constructor(transaction: Partial<TransactionDomain>) {
    Object.assign(this, transaction);
  }

  get txid(): string {
    return this._txid;
  }

  get confirmations(): number {
    return this._confirmations;
  }

  get amount(): number {
    return this._amount;
  }

  get from(): string {
    return this._from;
  }

  get orderId(): string {
    return this._orderId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
