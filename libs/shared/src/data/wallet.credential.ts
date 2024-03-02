import { randomUUID } from 'node:crypto';

export class WalletCredentialDomain {
  readonly #id: string;
  #privateKey: string;
  #createdAt: Date;
  #updatedAt: Date;

  constructor(wallet: Partial<WalletCredentialDomain>) {
    Object.assign(this, wallet);
    if (!this.#id) {
      this.#id = randomUUID();
    }
  }

  public get id(): string {
    return this.#id;
  }

  public get privateKey(): string {
    return this.#privateKey;
  }

  public set privateKey(privateKey: string) {
    this.#privateKey = privateKey;
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
      privateKey: this.privateKey,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return this.toJSON();
  }
}
