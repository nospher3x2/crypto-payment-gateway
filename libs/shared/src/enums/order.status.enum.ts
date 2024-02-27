export const OrderStatus = Object.freeze({
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  PARTIAL_RECEIVED: 'PARTIAL_RECEIVED',
  COMPLETED: 'COMPLETED',
  EXPIRED: 'EXPIRED',
  FAILED: 'FAILED',
});

export type OrderStatus = keyof typeof OrderStatus;
