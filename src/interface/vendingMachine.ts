export type Beverage = "콜라" | "물" | "커피";

export type NotificationMsg = "success" | "warning" | "error";

export type PaymentType = "CARD" | "CASH" | "";

export interface PaymentInfo {
  type: PaymentType;
  amount: number;
}
