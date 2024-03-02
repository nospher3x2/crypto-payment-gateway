export class TransactionDomain {
  #txid: string;
  #amount: number;
  #from: string;
  #confirmations: number;
  #orderId: string;
  #createdAt: Date;
  #updatedAt: Date;

  constructor(transaction: Partial<TransactionDomain>) {
    Object.assign(this, transaction);
  }

  public get txid(): string {
    return this.#txid;
  }

  public set txid(txid: string) {
    this.#txid = txid;
  }

  public get confirmations(): number {
    return this.#confirmations;
  }

  public set confirmations(confirmations: number) {
    this.#confirmations = confirmations;
  }

  public get amount(): number {
    return this.#amount;
  }

  public set amount(amount: number) {
    this.#amount = amount;
  }

  public get from(): string {
    return this.#from;
  }

  public set from(from: string) {
    this.#from = from;
  }

  public get orderId(): string {
    return this.#orderId;
  }

  public set orderId(orderId: string) {
    this.#orderId = orderId;
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
      txid: this.txid,
      amount: this.amount,
      from: this.from,
      confirmations: this.confirmations,
      orderId: this.orderId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return this.toJSON();
  }
}
