export class CreateWalletDto {
  public readonly currency: string;
}

export class CreateWalletResponseDto {
  public readonly address: string;
  public readonly balance: number;
}
