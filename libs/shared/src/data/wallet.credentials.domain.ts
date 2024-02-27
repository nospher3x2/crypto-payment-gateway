export class WalletCredentialsDomain {
  private readonly _encryptedSecretWords: string;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  constructor(wallet: Partial<WalletCredentialsDomain>) {
    Object.assign(this, wallet);
  }

  get encryptedSecretWords(): string {
    return this._encryptedSecretWords;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
