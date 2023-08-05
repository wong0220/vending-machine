export type Beverage = "COKE" | "WATER" | "COFFEE";

export type NotificationMsg = "success" | "warning" | "error";

export type PaymentType = "CARD" | "CASH" | "";

export interface PaymentInfo {
  type: PaymentType;
  amount: number;
}

export interface ProductInfo {
  price: number;
  stock: number;
}
