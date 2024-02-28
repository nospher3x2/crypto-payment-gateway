type TransactionDomainProps = {
  txid: string;
  amount: number;
  from: string;
  confirmations: number;
  orderId: string;
  createdAt: Date;
  updatedAt: Date;
};

export class TransactionDomain implements TransactionDomainProps {
  private readonly _txid: string;
  private _amount: number;
  private _from: string;
  private _confirmations: number;
  private _orderId: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(transaction: TransactionDomainProps) {
    Object.assign(this, transaction);
  }

  get txid(): string {
    return this._txid;
  }

  get confirmations(): number {
    return this._confirmations;
  }

  set confirmations(confirmations: number) {
    this._confirmations = confirmations;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(amount: number) {
    this._amount = amount;
  }

  get from(): string {
    return this._from;
  }

  set from(from: string) {
    this._from = from;
  }

  get orderId(): string {
    return this._orderId;
  }

  set orderId(orderId: string) {
    this._orderId = orderId;
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
