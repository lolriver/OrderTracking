export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'Pending' | 'In Progress' | 'Delivered';

export interface Order {
  id: string;
  status: OrderStatus;
  totalAmount: number;
  date: string; // ISO 8601 format YYYY-MM-DD
  items: OrderItem[];
  deliveryAddress: string;
}
